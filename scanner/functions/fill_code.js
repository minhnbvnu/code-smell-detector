function fill_code() {
    var code = trim_tails([
        'function(input) {                                 ',
        '    // bubble sorting the input array             ',
        '                                                  ',
        '    // switches the two elems if needed           ',
        '    // returns true if switched                   ',
        '    function switchEls(idx) {                     ',
        '        var switched = false;                     ',
        '        if (input[idx] < input[idx-1]) {          ',
        '            var tmp = input[idx];                 ',
        '            input[idx] = input[idx-1];            ',
        '            input[idx-1] = tmp;                   ',
        '            switched = true;                      ',
        '        }                                         ',
        '        return switched;                          ',
        '    }                                             ',
        '                                                  ',
        '    var switched;                                 ',
        '    do {                                          ',
        '        switched = false;                         ',
        '        for (var i = 1; i < input.length; i++) {  ',
        '            switched |= switchEls(i);             ',
        '        }                                         ',
        '    } while(switched);                            ',
        '                                                  ',
        '    return input;                                 ',
        '}                                                 ',
        '                                                  ',
        '                                                  '
    ].join('\n'));

    el.code.container.innerHTML = code;
}