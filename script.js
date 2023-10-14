const buttons = document.querySelectorAll('button');
const cur = document.querySelector('.cur')
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //console.log(button.dataset.id);
        appendNum(button.value);
        // cur.textContent = button.value;
    })}
);

let appendNum = (num) => {
    if (cur.textContent === '0') {
        cur.textContent = num;
    }
    else {
        cur.textContent += num;
    }
}