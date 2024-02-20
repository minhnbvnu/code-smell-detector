function to_int_values(s) {
    var a = [];
    for (var i = 0; i < s.length; ++i) {
        a.push(to_int(s[i]));
    }
    return a;
}