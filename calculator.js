/*
    calculator.js
    by Deanna Sulli
    4/13/16

 */


/*
 * Calculator
 *
 * @constructor
 * @this {Calculator}
 */

function Calculator() {
    var input_storage = [""];
    var storage_index = 0;
    var result = null;

    /*
     * Stores numbers into storage array
     *
     * @param {string} num User inputted number or decimal
     */
    function storeNumber(num) {
        //if current input is a decimal and there is already a decimal in the current index, do nothing
        if(num == "." && input_storage[storage_index].indexOf('.') != '-1') {
            return;
        }
        //add a 0 in front of decimal if no other numbers come before it
        else if(num == "." && input_storage[storage_index] === "") {
            input_storage[storage_index] += 0;
        }
        //store value into input_storage and display new number
        input_storage[storage_index] += num;
        addToDisplay(num);
        console.log(input_storage);

    }

    /*
     * Checks if a value is an operator
     *
     * @param {string} val value to check
     * @return {boolean} True if val is an operator, false if not
     */
    function isOperator(val) {
        return ['+', '-', '×', '÷'].indexOf(val) > -1;
    }

    /*
     * Stores operator into storage array by moving to the next storage index, storing the operator there,
     * then incrementing the storage index again.
     *
     * @param {string} operator User inputted operator
     *
     */
    function storeOperator(operator) {

        //check if we are in the first index of the array and if operator is -, then make next num negative
        if(storage_index === 0 && input_storage[storage_index] == "") {
            if(operator == '-') {
                input_storage[storage_index] = 0;
                storage_index++;
                input_storage[storage_index] = '-';
                storage_index++;
                input_storage[storage_index] = "";
                addToDisplay(operator);
            }
            return;
        }

        //first check if there is already an operator that was last pressed
        if(isOperator(input_storage[storage_index - 1]) && input_storage[storage_index] === "") {
            input_storage[storage_index - 1] = operator; //replace old operator with new one
        } else {
            storage_index++;
            input_storage[storage_index] = operator;
            storage_index++;
            input_storage[storage_index] = "";
            addToDisplay(operator);
        }
    }

    /*
     * Takes 3 parameters and returns a calculation based on those parameters.
     *
     * @param {string} op1 First Operand
     * @param {string} op2 Second Operand
     * @param {string} operator Operator
     * @return {number} The result of calculating the parameters.
     */
    function performCalc(op1, op2, operator) {
        var answer = null;
        switch(operator) {
            case '+':
                answer = op1 + op2;
                break;
            case '-':
                answer = op1 - op2;
                break;
            case '×':
                answer = op1 * op2;
                break;
            case '÷':
                if(op2 === 0) {
                    answer = 'Error';
                    break;
                }
                answer = op1 / op2;
                break;
        }
        return answer;
    }

    //calculate is called when the = button is pressed
    //goes through the input_storage array then calls perform_calc while there are values in the array

    /*
     * Called when the equals button is pressed.
     * Iterates through the input_storage array, then calls performCalc while there are values in the array.
     * Checks for certain conditions such as multiple operators pressed consecutively.
     * Calls displayResult once result is defined.
     *
     */
    function calculate() {

        var op1, op2, operator;

        //check if last input was an operator
        if(isOperator(input_storage[storage_index - 1]) && input_storage[storage_index] === "") {
            if(result == null && storage_index > 2) {
                op1 = parseFloat(input_storage[0]);
                operator = input_storage[1];
                //op2 is the value after the operator
                op2 = parseFloat(input_storage[2]);

                result = performCalc(op1,op2,operator);
            }
            input_storage[storage_index] = input_storage[storage_index - 2];
        }

        //check if last input was a number, as equals is pressed
        //for 1 + 1 = = =
        if(!isNaN(input_storage[storage_index]) && result !== null && result !== "Error" && input_storage[storage_index] !== "") {
            input_storage[storage_index] = result;
        }

        //if input_storage has only one value and = is pressed, the result is the value
        if(input_storage.length === 1 && input_storage[0] !== "") {
            result = input_storage[0];
            console.log('result became ', input_storage);
        }
        //if nothing was entered and = was pressed, the result is 0
        else if(input_storage.length === 1 && input_storage[0] === "") {
            result = 0;
        }

        //iterate through the input_storage array
        for(var i = 0; i < input_storage.length-1; i+=2) {
            //assign the first variable in input_storage to op1
            if(i === 0) {
                op1 = parseFloat(input_storage[i]);
            }
            else {
                op1 = result;
            }
            //otherwise, op1 is the result from the last calculation

            //operator is the value after the current index in input_storage
            operator = input_storage[i+1];
            //op2 is the value after the operator
            op2 = parseFloat(input_storage[i+2]);

            result = "" + performCalc(op1,op2,operator);
        }
        console.log('array in calculate 1:', input_storage);
        console.log('result in calculate 1:', result);

        displayResult();

        input_storage = [];
        storage_index = 0;
        input_storage[storage_index] = result;

        console.log('array in calculate 2:', input_storage);
        console.log('result in calculate 2:', result);


    }

    /*
     * Called when C button is pressed.
     * Sets the storage_index and input_storage to their initial values.
     */
    function clear() {
        storage_index = 0;
        input_storage = [''];
        result = null;
        removeResult();
    }

    //clear_entry clears the value at the current storage_index
    /*
     * Clears the value at the current storage_index.
     * Calls subFromDisplay to remove visually.
     */
    function clearEntry() {
        //if there is no value at current index (such as after an operator)
        if(input_storage[storage_index] === "" && storage_index  > 0) {
            storage_index--;
        }
        //if the value at current index has more than one digit
        if(input_storage[storage_index].length > 1) {
            var current_val = input_storage.pop(); //remove last value in input_storage
            input_storage[storage_index] = current_val.slice(0, current_val.length-1);
        }
        else {
            input_storage[storage_index] = ""; //replaces value with empty string
            if(storage_index > 0) {
                input_storage.splice(storage_index, 1); //deletes that empty string
                storage_index--;
            }
        }
        subFromDisplay();
        console.log('input storage: ', input_storage);
        console.log('storage index: ', storage_index);

    }


    /*
     * getInput function is passed input value and performs action based on input type
     * @param {string} button_val Value of the user inputted button
     */
    this.getInput = function(button_val) {

        switch(button_val) {
            case 'invalid':
                break;
            case '=':
                calculate();
                break;
            case '÷':
            case '×':
            case '-':
            case '+':
                storeOperator(button_val);
                break;
            case '.':
                storeNumber(button_val);

                break;
            case 'C':
                clear();
                break;
            case 'CE':
                clearEntry();
                break;
            default: //for nums
                storeNumber(button_val);
                break;
        }

    };


    /*
     * Animates the automatic scroll down from the #displays div
     */
    function scrollDown() {
        $('#displays').animate({ scrollTop: $('#displays').prop('scrollHeight') }, 400);
    }

    /*
     * Displays the result after pressing the equals button and the calculator finds the result.
     * Moves previous result to the previous-input styling.
     */
    function displayResult() {
        $('.result').addClass('previous-input');
        $('.result').removeClass('result');

        var new_result = $('<div>').addClass('result');
        for(var i = 0; i < result.length; i++) {
            new_result.append($('<span>').addClass('show-char').text(result[i]));
        }
        $('#displays').append(new_result);
        scrollDown();

        setTimeout(function() {
            $('.result .show-char').css({'max-width': '100%', 'opacity': '1'});
            result = null; //reset result to null for next operation
        }, 600);
    }

    /*
     * Called when C button is pressed.
     * Removes text from #display div.
     */
    function removeResult() {
        $('.previous-input span').fadeOut(500, function() {
            $('.previous-input').remove();
        });
        $('.result span').fadeOut(500, function() {
            $('.result span').remove();
        });
    }

    /*
     * Called whenever any number or operator button is pressed.
     * Creates and animations a new span element containing the value of the button pressed.
     *
     * @param {string} val Value from user input to display
     */
    function addToDisplay(val) {
        var newVal = $('<span>').addClass('show-char').text(val);
        $('.result').append(newVal);
        scrollDown();
        setTimeout(function() {
            newVal.css({'max-width': '100%', 'opacity': '1'});
        }, 600);
    }

    /*
     * Called when the CE button is pressed.
     * Clears one value from the end (like a backspace key).
     */
    function subFromDisplay() {
        $('.result .show-char:last-child').animate({
            opacity: 0,
            'max-width': 0
        }, 200, function() {
            this.remove();
        });
    }
}
