var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    decimalBtn = document.getElementById('decimal'),
    histBtn = document.getElementById('showHist'),
    display = document.getElementById('display'),
    operationsList = document.getElementById('operationsList'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    firstNumber = true;
MemoryPendingOperation = '';

var currentState = {
    operation: "+",
    firstOperand: "1",
    secondOperand: "2",
    result: "3",
    operationCount: 0,

    toStr: function () {
        return ( this.firstOperand + " " + this.operation + " " +
        this.secondOperand + " = " + this.result);
    }
};

for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}
;

for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}
;

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.id);
    });
}
;

decimalBtn.addEventListener('click', decimal);
histBtn.addEventListener('click', function (e) {
    console.log(operationsList.style.display);
    if (operationsList.style.display === "") {
        operationsList.style.display = "table";
    }
    else {
        operationsList.style = "";
    }
});

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
        ;
    }
    ;
};

function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {   //чтобы начать показывать второе число
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        currentState.firstOperand = (firstNumber ? localOperationMemory : MemoryCurrentNumber);
        currentState.secondOperand = (firstNumber ? "" : localOperationMemory);
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        ;

        currentState.result = MemoryCurrentNumber;
        (firstNumber || MemoryPendingOperation === '=') ? firstNumber = false : appendOperation(currentState.toStr());

        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
        currentState.operation = op;
    }
    ;
};

function decimal() {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
        ;
    }
    ;
    display.value = localDecimalMemory;
};

function clear(id) {
    appendOperation(id);
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        firstNumber = true;
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
        removeHistory();
    }
    ;
};

function removeHistory() {
    while (operationsList.firstChild) {
        operationsList.removeChild(operationsList.firstChild);
    }
}

function appendOperation(element) {
    var newLi = document.createElement('li');
    newLi.innerText = element;
    //console.log(newLi);
    operationsList.appendChild(newLi);

};

