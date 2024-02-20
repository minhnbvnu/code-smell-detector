function ValidatedControlOnBlur(event) {
    event = event || window.event;
    var control;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        control = event.srcElement;
    }
    else {
        control = event.target;
    }
    if ((typeof(control) != "undefined") && (control != null) && (Page_InvalidControlToBeFocused == control)) {
        control.focus();
        Page_InvalidControlToBeFocused = null;
    }
}