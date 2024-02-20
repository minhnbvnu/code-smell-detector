function valueElsePlaceholder(textBox) {
    //noinspection JSUnresolvedVariable
    return textBox.value === '' ? textBox.placeholder : textBox.value;
}