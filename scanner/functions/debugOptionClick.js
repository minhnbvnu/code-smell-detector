function debugOptionClick(event) {
    const element = event.target;
    event.stopPropagation();
    if (element.id === 'wordWrapEnabled') {
        const outputDisplayPane = document.getElementById('outputDisplayPane');
        outputDisplayPane.style.whiteSpace = element.checked ? 'pre-wrap' : 'pre';
    } else if (element.id !== 'automathEnabled' && element.id !== 'restartOnFocusEnabled') {
        QRuntime['$' + element.id] = element.checked;
    }
    saveIDEState();
}