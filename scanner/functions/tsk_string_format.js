function tsk_string_format(s_str) {
    for (var i = 1; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gi');
        s_str = s_str.replace(regexp, arguments[i]);
    }
    return s_str;
}