/*
 script.js
 by Deanna Sulli
 4/11/16

 */

function convertKeyCode(keyCode) {
    var keyChart = {
        48: 0,
        49: 1,
        50: 2,
        51: 3,
        52: 4,
        53: 5,
        54: 6,
        55: 7,
        56: 8,
        57: 9,
        43: '+',
        47: '÷',
        120: '×',
        42: '×',
        45: '-',
        46: '.',
        61: '=',
        13: '=',
        8: 'CE'
    };

    if (keyChart[keyCode] != undefined) {
        return keyChart[keyCode];
    }
    return 'invalid';
}

$(document).ready(function() {

    var calc = new Calculator();

    //click input
    $('button').click(function() {
        calc.getInput($(this).text());
    });

    //keyboard input
    $(window).keypress(function(e) {
        $('button:contains(' + convertKeyCode(e.keyCode) + ')').addClass('activeButton');
        calc.getInput(convertKeyCode(e.keyCode));
    });

    $(window).keyup(function(e) {
        $('button').removeClass('activeButton');
    });
});