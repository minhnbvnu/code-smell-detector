function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.checked == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.childNodes.length; i++) {
        val = ValidatorGetValueRecursive(control.childNodes[i]);
        if (val != "") return val;
    }
    return "";
}