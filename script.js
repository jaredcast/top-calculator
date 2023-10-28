const buttons = document.querySelectorAll('button');
const numButtons = document.querySelectorAll('.calcBtn');
const opButtons = document.querySelectorAll('.opBtn');
const eqBtn = document.querySelector('.eqBtn');
const cur = document.querySelector('.cur');
const prevText = document.querySelector('.prev');
const clearBtn = document.querySelector('.clearBtn');
const delBtn = document.querySelector('.delBtn')

let num1 = '';
let num2 = '';
let oper = "";

let appendNum = (num) => {
    if (cur.textContent === '' || cur.textContent === '0' || cur.textContent === 'NaN') {
        cur.textContent = num;
        prevText.textContent += num;
    }
    else {
        cur.textContent += num;
        prevText.textContent += num;
    }

    if (oper == "") {
        num1 += num;
    }
    else {
        num2 += num;
    }
    //console.log(`Num1  ${num1} and num2 ${num2}`);
}

let calcOperate = (val1, o, val2) => {
    //console.log(`${val1} ${o} ${val2}`);
    val1 = roundNum(Number(val1));
    val2 = roundNum(Number(val2));
    switch (o) {
        case '+':
            return roundNum(val1 + val2);
        case '-':
            return roundNum(val1 - val2);
        case '*':
            return roundNum(val1 * val2);
        case '/':
            if (val2 == 0) {
                alert("Cannot divide by 0!");
                return "NaN";
            }
            return roundNum(val1 / val2);
    }

}

let roundNum = (num) => {
    return Math.round(num * 100000000) / 100000000
      
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        //console.log(button.dataset.id);
        // cur.textContent = button.value;
        //appendNum(button.value);
        //console.log(button.value);
        appendNum(button.value);
    })}
);

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        //If this is a second operator without it being reset  && num1 != "" && num2 != ""
        if (oper != "" && num1 != "" && num2 != "") {
            oper = button.value;
            num1 = calcOperate(num1, oper, num2);
            prevText.textContent += oper;
            cur.textContent = num1 + oper;
            num2 = "";
        }
        // If this is the first operator being used
        else {
            oper = button.value;
            cur.textContent += oper;
            prevText.textContent = num1 + oper;
        }
          
    })
});

//Once you hit equal, calculate the final thing you have. Set the answer to num1 for additional work
eqBtn.addEventListener('click', () => {
    ans = calcOperate(num1, oper, num2)
    console.log(ans);
    cur.textContent = ans;
    num1 = ans;
    oper, num2 = "";
})

delBtn.addEventListener('click', () => {
    prevText.textContent = cur.textContent;
    cur.textContent = cur.textContent.slice(0,-1);
    prevText.textContent = prevText.textContent.slice(0,-1)
    if (num2 != "") {
        num2 = num2.slice(0,-1);
    }
    else if (oper != "") {
        oper = oper.slice(0,-1);
    }
    else if (num1 != "") {
        num1 = num1.slice(0,-1);
    }
})
clearBtn.addEventListener('click', () => {
    cur.textContent = "";
    prevText.textContent = "";
    num1 = '';
    num2 = '';
    oper = "";
})