function readNumberFromControl(controlName, defaultValue) {
    const a = parseFloat(document.getElementById(controlName).value)
    if (! isFinite(a)) {
        return defaultValue === undefined ? 0 : defaultValue;
    } else {
        return a;
    }
}