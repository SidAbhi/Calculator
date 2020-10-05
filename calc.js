const calcBox = document.querySelector('#calc');
const showOp = document.querySelector('.showOp');
const tempRslt = document.querySelector('#result');
let num = [0, 0];
let rsltVal = 0;
let overwrite = true;
const btnNum = [...document.querySelectorAll('.Num')];
const btnOp = [...document.querySelectorAll('.Op')];
let operator = '';


function clear() {
    calcBox.textContent = '0';
    num = [0, 0];
    rsltVal = 0;
    operator = '';
    overwrite = true;
};

function valExt() {
    str = calcBox.textContent.replace(/[\slog()]/g,'');
    num = str.split(/[-+x^√\/]/);
    for (i=0; i<num.length; i++) {
        num[i] = parseInt(num[i]);
    };
};

function calc() {
    valExt();

};

function del() {
    if (Number.isNaN(num[1]) || operator === 'log') {
        calcBox.textContent = calcBox.textContent.replace(/[-+x^√\/\slog()]/g,'');
    } else {
        calcBox.textContent = calcBox.textContent.slice(0, -1);
    };
    valExt();
}

function inputNum() {
    nmpad = document.querySelector(`#${this.id}`).dataset.val;
    if(overwrite === true) {
        calcBox.textContent = `${nmpad}`;
        overwrite = false;
    } else if(operator === 'log'){
        valExt();
        calcBox.textContent = `log(${num[0]}${nmpad})`
    } else {
        calcBox.textContent = `${calcBox.textContent}${nmpad}`;
    }
    valExt();
};

function inputOp() {
    overwrite = false;
    oppad = document.querySelector(`#${this.id}`).id;
    opc = calcBox.textContent.replace(/[^-+x^√\/l]/g,"").length;
    if(oppad === 'plus') {
        calcBox.textContent = `${calcBox.textContent} + `;
        operator = oppad;
    } else if(oppad === 'neg') {
        calcBox.textContent = `${calcBox.textContent} - `;
        operator = oppad;
    } else if(oppad === 'mult') {
        calcBox.textContent = `${calcBox.textContent} x `;
        operator = oppad;
    } else if(oppad === 'div') {
        calcBox.textContent = `${calcBox.textContent} / `;
        operator = oppad;
    } else if(oppad === 'sqrt') {
        calcBox.textContent = `${calcBox.textContent} √ `;
        operator = oppad;
    } else if(oppad === 'pwr') {
        calcBox.textContent = `${calcBox.textContent} ^ `;
        operator = oppad;
    } else if(oppad === 'log') {
        calcBox.textContent = `log(${calcBox.textContent})`;
        operator = oppad;
    } else if(oppad === 'clear'){
        clear();
    } else if(oppad === 'del') {
        valExt();
        del();
        if(calcBox.textContent === '0') {
            overwrite = true;
        };
    } else if(oppad === 'eql') {
        return x;
    }
};

btnNum.forEach(val => {
    val.addEventListener('click', inputNum);
});

btnOp.forEach(op => {
    op.addEventListener('click', inputOp)
});
