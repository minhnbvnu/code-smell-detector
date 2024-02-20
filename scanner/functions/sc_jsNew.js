function sc_jsNew(c) {
    var evalStr = "new c(";
    evalStr +=arguments.length > 1? "arguments[1]": "";
    for (var i = 2; i < arguments.length; i++)
	evalStr += ", arguments[" + i + "]";
    evalStr +=")";
    return eval(evalStr);
}