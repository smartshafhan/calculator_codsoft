const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            firstOperand = '';
            operator = '';
            display.value = '';
        } else if (value === '=') {
            if (firstOperand && operator && currentInput) {
                display.value = calculate(firstOperand, operator, currentInput);
                firstOperand = display.value;
                operator = '';
                currentInput = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (firstOperand) {
                    firstOperand = calculate(firstOperand, operator, currentInput);
                } else {
                    firstOperand = currentInput;
                }
                operator = value;
                currentInput = '';
                display.value = firstOperand;
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}
