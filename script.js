function callback(type, value, item) {
    if(value == undefined) {
        $('#answer').text("");
    }
    else {
        $('#answer').text(value);
    }

}

var my_calculator = new calculator(callback);

$(document).ready(function() {
    $('button').on('click', function() {
        var val = $(this).attr('name');

        if(val == 'C' || val == 'CE') {
            my_calculator.allClear();
        }
        else {
            my_calculator.addItem(val);
        }
    });
});