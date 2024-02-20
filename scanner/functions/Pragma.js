function Pragma(n) {
    if (n.type === SEMICOLON) {
        var e = n.expression;
        if (e.type === STRING && e.value === "use strict") {
            n.pragma = "strict";
            return true;
        }
    }
    return false;
}