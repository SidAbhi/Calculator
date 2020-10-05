const calcBox = document.querySelector('#calc');
const showOp = document.querySelector('.showOp');
const tempRslt = document.querySelector('#result');
let num = [0, 0];
let rsltVal = 0;
let overwrite = true;
let fnlRslt = false;
const btnNum = [...document.querySelectorAll('.Num')];
const btnOp = [...document.querySelectorAll('.Op')];
let operator = '';


function clear() {
    calcBox.textContent = '0';
    num = [0, 0];
    rsltVal = 0;
    operator = '';
    overwrite = true;
    tempRslt.textContent = '';
};

function nan() {
    if (Number.isNaN(num[0])||Number.isNaN(num[1])||Number.isNaN(rsltVal)) {
    clear();
    };
};


function valExt() {
    str = calcBox.textContent.replace(/[\slog()√]/g,'');
    num = str.split(/[-+x^\/]/);
    for (i=0; i<num.length; i++) {
        num[i] = parseInt(num[i]);
    };
};

function calc() {
    valExt();
    if(operator === 'plus') {
        rsltVal = num[0] + num[1];
    } else if(operator === 'neg') {
        rsltVal = num[0] - num[1];
    } else if(operator === 'mult') {
        rsltVal = num[0] * num[1];
    } else if(operator === 'div') {
        rsltVal = num[0] / num[1];
    } else if(operator === 'sqrt') {
        rsltVal = Math.sqrt(num[0]);
    } else if(operator === 'pwr') {
        rsltVal = Math.pow(num[0], num[1]);
    } else if(operator === 'log') {
        rsltVal = Math.log(snum[0]);
    } else if(operator === '') {
        rsltVal = num[0];
    };
    tempRslt.textContent = rsltVal;
};

function del() {
    if (Number.isNaN(num[1]) || operator === 'log') {
        calcBox.textContent = calcBox.textContent.replace(/[-+x^√\/\slog()]/g,'');
    } else if(fnlRslt = true) {
        calcBox.textContent = '0';
        fnlRslt = false;
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
    } else if(operator === 'sqrt'){
        valExt();
        calcBox.textContent = `√${num[0]}${nmpad}`
    } else {
        calcBox.textContent = `${calcBox.textContent}${nmpad}`;
    }
    valExt();
    calc();
};

function inputOp() {
    nan();
    overwrite = false;
    oppad = document.querySelector(`#${this.id}`).id;
    opc = calcBox.textContent.replace(/[^-+x^√\/l]/g,"").length;
    tmpCalc = function() {
        calc();
        calcBox.textContent = `${rsltVal}`
        valExt();
        rsltVal = 0;
        tempRslt.textContent = '';
        operator = '';
    };
    addOp = function() {
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
            calcBox.textContent = `√${calcBox.textContent}`;
            operator = oppad;
        } else if(oppad === 'pwr') {
            calcBox.textContent = `${calcBox.textContent} ^ `;
            operator = oppad;
        } else if(oppad === 'log') {
            calcBox.textContent = `log(${calcBox.textContent})`;
            operator = oppad;
        };
    };
    if (opc === 0 && (oppad !== 'log' && oppad !== 'sqrt')) {  
        addOp();  
    } else if (opc === 0 && (oppad === 'log' || oppad === 'sqrt')){
        addOp();
        calc();
    } else if(oppad ==='eql') {
        tmpCalc();
        fnlRslt = true;
    };

    if(oppad === 'clear'){
        clear();
    } else if(oppad === 'del') {
        valExt();
        del();
        if(calcBox.textContent === '0') {
            overwrite = true;
        };
    };
};

btnNum.forEach(val => {
    val.addEventListener('click', inputNum);
});

btnOp.forEach(op => {
    op.addEventListener('click', inputOp)
});
