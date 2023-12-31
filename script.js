const buttons = document.querySelectorAll('button');
const numButtons = document.querySelectorAll('.calcBtn');
const opButtons = document.querySelectorAll('.opBtn');
const eqBtn = document.querySelector('.eqBtn');
const cur = document.querySelector('.cur');
const prevText = document.querySelector('.prev');
const clearBtn = document.querySelector('.clearBtn');
const delBtn = document.querySelector('.delBtn')
const perButton = document.getElementById('per');

let num1 = '';
let num2 = '';
let oper = "";

let allowPeriod = true;

let appendNum = (num) => {
    if (num === '.') {disablePer();}
    if (cur.textContent === '' || cur.textContent === '0' || cur.textContent === 'NaN') { //Empty, replace vals
        cur.textContent = num;
        prevText.textContent += num;
    }
    else { //Append normally
        cur.textContent += num;
        prevText.textContent += num;
    }

    if (oper == "") {
        num1 += num;
        // if (num1.includes(".")) {disablePer();}
    }
    else {
        num2 += num;
        // if (num2.includes(".")) {disablePer();}
    }


    console.log(`Num1 ${num1} Oper ${oper} Num2 ${num2}`);
}

let appendOp = (op) => {
    enablePer(); //Enable the period key every time a new number is dealt with after appending an operator
    if (oper != "" && num1 != "" && num2 != "") {
        num1 = calcOperate(num1, oper, num2);
        oper = op;
        prevText.textContent += oper;
        cur.textContent = num1 + oper;
        num2 = "";
        console.log("New op used");

    }
    // If this is the first operator being used
    else {
        oper = op;
        cur.textContent += oper;
        prevText.textContent = num1 + oper;
        
        console.log("First uses");
    }
      
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
                prevText.textContent = "";
                return "NaN";
            }
            return roundNum(val1 / val2);
    }

}

let roundNum = (num) => {
    return Math.round(num * 100000000) / 100000000;
}

let disablePer = () => {
    perButton.disabled = true;
    allowPeriod = false;
}
let enablePer = () => {
    perButton.disabled = false;
    allowPeriod = true;
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        appendNum(button.value);
    })}
);

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        //If this is a second operator without it being reset  && num1 != "" && num2 != ""
        // if (oper != "" && num1 != "" && num2 != "") {
        //     oper = button.value;
        //     num1 = calcOperate(num1, oper, num2);
        //     prevText.textContent += oper;
        //     cur.textContent = num1 + oper;
        //     num2 = "";
        // }
        // // If this is the first operator being used
        // else {
        //     oper = button.value;
        //     cur.textContent += oper;
        //     prevText.textContent = num1 + oper;
        // }
        appendOp(button.value);
    })
});

//Once you hit equal, calculate the final thing you have. Set the answer to num1 for additional work
eqBtn.addEventListener('click', () => {
    ans = calcOperate(num1, oper, num2)
    console.log(ans);
    cur.textContent = ans;
    num1 = ans.toString();
    oper= "";
    num2 = "";
    console.log(`Num1 ${num1} Oper ${oper} Num2 ${num2}`);
})

delBtn.addEventListener('click', () => {
    prevText.textContent = cur.textContent;
    cur.textContent = cur.textContent.slice(0,-1);
    prevText.textContent = prevText.textContent.slice(0,-1)
    if (num2 != "") {
        num2 = num2.slice(0,-1);
        console.log(num2);
        console.log("Del num 2");
    }
    else if (oper != "") {
        oper = oper.slice(0,-1);
        console.log(oper);
        console.log("Del op");
    }
    else if (num1 != "") {
        num1 = num1.slice(0,-1);
        console.log(num1);
        console.log("Del num 1");
    }
    console.log({num1,oper,num2});
})
clearBtn.addEventListener('click', () => {
    cur.textContent = "";
    prevText.textContent = "";
    num1 = '';
    num2 = '';
    oper = "";
})

window.addEventListener("keydown", (e) => {
    if (e.key === '.' && allowPeriod === true) {
        appendNum(e.key);
        allowPeriod = false;
        console.log("No more pressing . for current num");
    }
    if (e.key >= 0 && e.key <= 9) {appendNum(e.key);}
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {appendOp(e.key);}
    if (e.key === "=" || e.key === 'Enter') {eqBtn.click();}
    if (e.key === "Backspace") {delBtn.click();}
});