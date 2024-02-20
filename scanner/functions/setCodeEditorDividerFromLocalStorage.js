function setCodeEditorDividerFromLocalStorage() {
    let dividerHeight = parseInt(localStorage.getItem('codeDividerTop'));
    if (isNaN(dividerHeight) || dividerHeight > window.innerHeight - 64) {
        // Fallback
        dividerHeight = '1fr';
    } else {
        dividerHeight += 'px';
    }
    codePlusFrame.style.gridTemplateRows = `auto ${dividerHeight} auto 1fr`;
}