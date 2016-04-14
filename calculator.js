/*
    calculator.js
    by Deanna Sulli
    4/13/16

 */

function Calculator() {
    var input_storage = [""];
    var storage_index = 0;
    var result = null;


    //Stores number into storage array
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

    //checks if a value is an operator, returns a bool
    function isOperator(val) {
        return ['+', '-', '×', '÷'].indexOf(val) > -1;
    }

    //Stores operator into storage array by moving to the next index, storing the operator there,
    //then incrementing the index again.
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

    ////performCalc takes 3 parameters: op1, op2, and operator
    //returns the calculation based on those parameters
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

            result = performCalc(op1,op2,operator);
        }
        console.log('array in calculate:', input_storage);
        console.log('result in calculate:', result);
        displayResult();
    }

    ////clear sets the storage_index and input_storage to their initial values
    function clear() {
        storage_index = 0;
        input_storage = [''];
        result = null;
    }

    //clear_entry clears the value at the current storage_index
    function clearEntry() {
        if(input_storage[storage_index] === "" && storage_index  > 0) {
            storage_index--;
        }
        if(input_storage[storage_index].length > 1) {
            var current_val = input_storage.pop();
            input_storage[storage_index] = current_val.slice(0, current_val.length-1);
            console.log('i was sliced :(');
        }
        else {
            input_storage[storage_index] = ""; //replaces value with empty string
            if(storage_index > 0) {
                storage_index--;
            }
        }
        subFromDisplay();
        console.log('input storage: ', input_storage);
        console.log('storage index: ', storage_index);

    }


    /* getInput function is passed input value and performs action based on input type
     * @params: button_val - value of the user inputted button
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
                break;
            case 'CE':
                clearEntry();
                break;
            default: //for nums
                storeNumber(button_val);

                break;
        }

    };

    function displayResult() {
        $('.result').addClass('previous-input');
        $('.result').removeClass('result');

        var new_result = $('<div>').addClass('result');
        var result_span = $('<span>').addClass('show-char').text(result);
        new_result.append(result_span);
        $('#displays').append(new_result);
        setTimeout(function() {
            result_span.css({'max-width': '100%', 'opacity': '1'});
            $('#displays').animate({ scrollTop: $('#displays').prop('scrollHeight') }, 600);
        }, 1000);
    }

    function addToDisplay(result) {
        var newResult = $('<span>').addClass('show-char').text(result);
        $('.result').append(newResult);
        setTimeout(function() {
            newResult.css({'max-width': '100%', 'opacity': '1'});
            $('#displays').animate({ scrollTop: $('#displays').prop('scrollHeight') }, 600);

        }, 1000);
    }

    function subFromDisplay() {
        $('.result .show-char:last-child').addClass('hide-char').removeClass('show-char');
        setTimeout(function(){
            $('.result .hide-char').remove();
        }, 1000);
    }
}
