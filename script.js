var input_storage = [''];
var storage_index = 0;
var result = null;

//Stores number into storage array
function store_number(val) {
    //check if the last input is a . and the next input is a . to prevent multiple .s
    if(input_storage[storage_index][input_storage[storage_index].length - 1] === '.' && val === '.') {
        if(input_storage[storage_index - 1] >= 0)
            input_storage[storage_index - 1] = val;
    }
    //if it isn't a ., then add the number to the current index value
    else {
        input_storage[storage_index] += val;
    }

}

//checks if a value is an operator, returns a bool
function is_operator(val) {
    if(['+', '-', 'x', '/'].indexOf(val) > -1) {
        return true;
    } else {
        return false;
    }
}

//Stores operator into storage array by moving to the next index, storing the operator there,
//then incrementing the index again.
function store_operator(val) {
    //check if we are in the first index of the array
    if(storage_index === 0 && input_storage[storage_index] == "") {
        if(val == '-') {
            input_storage[storage_index] = 0;
            storage_index++;
            input_storage[storage_index] = '-';
            storage_index++;
            input_storage[storage_index] = "";
        }
        return;
    }

    //first check if there is already an operator that was last pressed
    if(is_operator(input_storage[storage_index - 1]) && input_storage[storage_index] === "") {
        input_storage[storage_index - 1] = val; //replace old operator with new one
    } else {
        storage_index++;
        input_storage[storage_index] = val;
        storage_index++;
        input_storage[storage_index] = "";

    }
}

//Checks if there is a result, and if there is, outputs it. If not, it outputs the current input storage array contents.
function update_display() {
    var output_array = '';
    var output_answer = '';
    if(result !== null) {
        output_answer = result;
    }
    if(input_storage.length > 0) {
        for(var i = 0; i < input_storage.length; i++) {
            output_array += input_storage[i];
        }

    }

    //show input and result on the display divs
    $('#input-display').text(output_array);
    $('#result').text(output_answer);
}
//perform_calc takes 3 parameters: op1, op2, and operator
//returns the calculation based on those parameters
function perform_calc(op1, op2, operator) {
    var answer = null;
    switch(operator) {
        case '+':
            answer = op1 + op2;
            break;
        case '-':
            answer = op1 - op2;
            break;
        case 'x':
            answer = op1 * op2;
            break;
        case '/':
            if(op2 === 0) {
                answer = 'Error';
                break;
            }
            answer = op1 / op2;
            break;
    }
    return answer;
}

//do_math is called when the = button is pressed
//goes through the input_storage array then calls perform_calc while there are values in the array
function do_math() {

    var op1, op2, operator;

    //check if last input was an operator
    //CHANGE THIS
    if(is_operator(input_storage[storage_index - 1]) && input_storage[storage_index] === "") {
        input_storage[storage_index] = input_storage[storage_index - 2];
    }

    //check if last input was a number, as equals is pressed
    //for 1 + 1 = = =
    if(!isNaN(input_storage[storage_index]) && result !== null && input_storage[storage_index] !== "") {

        var op1_copy = result;
        var operator_copy = input_storage[storage_index - 1];
        var op2_copy = input_storage[storage_index];
        input_storage[storage_index] = op1_copy;
    }

    //if input_storage has only one value and = is pressed, the result is the value
    if(input_storage.length === 1 && input_storage[0] !== "") {
        result = input_storage[0];
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

        result = perform_calc(op1,op2,operator);
    }

}

//clear sets the storage_index and input_storage to their initial values
function clear() {
    storage_index = 0;
    input_storage = [''];
    result = null;
}

//clear_entry clears the value at the current storage_index
function clear_entry() {

    if(input_storage[storage_index] === "" && storage_index  > 0) {
        storage_index--;
    }
    input_storage[storage_index] = ""; //replaces value with empty string
}

$(document).ready(function(){
   $('button').click(function(){
       var button_val = $(this).attr('name');
       //if the button val is a number
       if(!isNaN(parseInt(button_val)) || button_val == ".") {
           store_number(button_val);
       }
       else if(is_operator(button_val)) {

            store_operator(button_val);
       }
       else if(button_val == "=") {
           do_math();
       }
       else if(button_val == "C") {
            clear();
       }
       else if(button_val == "CE") {
           clear_entry();
       }
       update_display();

       console.log(input_storage);

   });
});