function describeText(textContent, symbol) {
    if (isNumber(textContent)) {
        textContent += '';
    }
    textContent = textContent || '';
    const maxHeight = symbol['textMaxHeight'] || 0;
    const textDesc = splitTextToRow(textContent, symbol);
    if (maxHeight && maxHeight < textDesc.size.height) {
        textDesc.size.height = maxHeight;
    }
    return textDesc;
}