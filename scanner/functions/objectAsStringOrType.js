function objectAsStringOrType(object) {
    var label = safeToString(object);
    var re = /\[object (.*?)\]/;
    var m = re.exec(label);
    return m ? m[1] : label;
}