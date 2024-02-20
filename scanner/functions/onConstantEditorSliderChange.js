function onConstantEditorSliderChange(controlName, value, format) {
    const textBox = document.getElementById(controlName);
    console.assert(textBox, 'Could not find control id = "' + controlName + '"');
    textBox.value = QRuntime.format_number(value, format);
    textBox.onchange();
}