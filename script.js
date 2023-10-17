const buttons = document.querySelectorAll('button');
const numButtons = document.querySelectorAll('.calcBtn');
const opButtons = document.querySelectorAll('.opBtn');
const eqBtn = document.querySelector('.eqBtn');
const cur = document.querySelector('.cur');

let num1 = '';
let num2 = '';
let oper = "";

let appendNum = (num) => {
    if (cur.textContent === '' || cur.textContent === '0') {
        cur.textContent = num;
    }
    else {
        cur.textContent += num;
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
    val1 = Number(val1);
    val2 = Number(val2);
    switch (o) {
        case '+':
            return val1 + val2;
        case '-':
            return val1 - val2;
        case '*':
            return val1 * val2;
        case '/':
            return val1 / val2;
    }

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
        // if (num1 === '') { //Add to num1
        //     console.log("num1 empty, adding to it")
        //     num1 = cur.textContent;
        //     oper = cur.buttonValue;
        //     cur.textContent += button.value;
        // }
        // else {

        // }
        if (oper != "") {
            cur.textContent = calcOperate(num1, oper, num2);
        }
        else {
            oper = button.value;
            cur.textContent += oper;
        }
        
    })
});

eqBtn.addEventListener('click', () => {
    ans = calcOperate(num1, oper, num2)
    console.log(ans);
    cur.textContent = ans;
    num1 = ans;
    oper, num2 = "";
})
