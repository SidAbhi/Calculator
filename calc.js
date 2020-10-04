const numB = document.querySelector('#numB');
const numA = document.querySelector('#numA');
const showOp = document.querySelector('.showOp');
const tempRslt = document.querySelector('#result');
let numValA = 0;
let numValB = 0;
const btnNum = [...document.querySelectorAll('.Num')];
const btnOp = [...document.querySelectorAll('.Op')];
let operator = '';

function inputNum() {
    val = document.querySelector(`#${this.id}`).dataset.value;
    if(numB.textContent === '0') {
        numB.textContent = val;
    } else if(numB.textContent.length < 16){
        numB.textContent = `${numB.textContent}${val}`;
    };
    numValB = parseInt(numB.textContent);
    console.log(numValB);
}

function show() {
    if(operator === 'plus') {
        showOp.textContent = `+`;
    } else if(operator === 'neg') {
        showOp.textContent = `-`;
    } else if(operator === 'mult') {
        showOp.textContent = `x`;
    } else if(operator === 'div') {
        showOp.textContent = `/`;
    };
};

function result() {
    numB.textContent = `0`;
    numValA = numValB;
    operator = document.querySelector(`#${this.id}`).id;
    numA.textContent = `${numValB}`;
    console.log(operator);

    
}

btnNum.forEach(num => {
    num.addEventListener('click', inputNum);
});

btnOp.forEach(op => {
    op.addEventListener('click', result);
});
