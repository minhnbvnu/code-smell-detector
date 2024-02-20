function definedToJs(options) {
    /*jshint evil:true*/
    options = isString(options) ? new Function("return " + options + ";")() : options;
    var ret = ["(function(){"], value;

    if (options.hasOwnProperty("constructor") && "function" === typeof options.constructor) {
        ret.push("var Defined = " + options.constructor.toString() + ";");
    } else {
        ret.push("var Defined = function(opts){ for(var i in opts){if(opts.hasOwnProperty(i)){this[i] = opts[i];}}};");
    }
    ret.push("var proto = Defined.prototype;");
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            value = options[key];
            ret.push("proto." + key + " = " + (extd.isFunction(value) ? value.toString() : extd.format("%j", value)) + ";");
        }
    }
    ret.push("return Defined;");
    ret.push("}())");
    return ret.join("");

}