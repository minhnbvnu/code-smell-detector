function evalName(context, name) {
        var value = '';
        var i;
        var n = name.length;
        var output = { add: function (s) { value += s; } };
        for (i = 0; i < n; i++) {
            name[i].eval(context).genCSS(context, output);
        }
        return value;
    }