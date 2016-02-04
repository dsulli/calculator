var input_storage = [''];
var storage_index = 0;
var result = null;

function store_number(val) {
    input_storage[storage_index] += val;
    update_display();
}

//Stores operator into storage array by moving to the next index, storing the operator there,
//then incrementing the index again.
function store_operator(val) {
    storage_index++;
    input_storage[storage_index] = val;
    storage_index++;
    input_storage[storage_index] = "";
    update_display();
}

//Checks if there is a result, and if there is, outputs it. If not, it outputs the current input storage array contents.
function update_display() {
    var output_array = '';
    var output_answer = '';
    if(result !== null) {
        output_answer = result;
    }
    for(var i = 0; i < input_storage.length; i++) {
        output_array += input_storage[i];
    }


    $('#input-display').text(output_array);
    $('#result').text(output_answer);
}

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

function do_math() {
    var op1, op2, operator;
    for(var i = 0; i < input_storage.length-1; i+=2) {
        if(i === 0) {
            op1 = parseInt(input_storage[i]);
        }
        else {
            op1 = result;
        }
        operator = input_storage[i+1];
        op2 = parseInt(input_storage[i+2]);
        result = perform_calc(op1,op2,operator).toFixed(10);
    }
}

function clear() {
    storage_index = 0;
    input_storage = [''];
    console.log(input_storage);
    result = null;
    update_display();
}

function clear_entry() {
    input_storage[storage_index] = "";
    console.log(input_storage, storage_index);
    update_display();
}

$(document).ready(function(){
   $('button').click(function(){
       var button_val = $(this).attr('name');
       //if the button val is a number
       if(!isNaN(parseInt(button_val))) {
           store_number(button_val);
       }
       else if(['+', '-', 'x', '/'].indexOf(button_val) > -1) {
            store_operator(button_val);
       }
       else if(button_val == "=") {
           do_math();
           update_display();
       }
       else if(button_val == "C") {
            clear();
       }
       else if(button_val == "CE") {
           clear_entry();
       }

       console.log(input_storage);
   });
});