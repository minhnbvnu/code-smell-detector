function toPretty(grammar) {
    'use strict';
    var i, j,
        pretty = '',
        left = 0,
        keys = Object.keys(grammar);

    function space(num) {
        var s = '';
        while (num > 0) {
            s += ' ';
            num -= 1;
        }
        return s;
    }

    keys.forEach(function (key) {
        if (key.length > left) {
            left = key.length;
        }
    });
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            if (j === 0) {
                pretty += space(left - keys[i].length);
                pretty += keys[i];
                pretty += ' -> ';
            } else {
                pretty += space(left);
                pretty += '  | ';
            }
            pretty += grammar[keys[i]][j].join(' ') + '\n';
        }
    }

    return pretty;
}