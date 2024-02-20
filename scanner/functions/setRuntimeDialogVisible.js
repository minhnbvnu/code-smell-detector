function setRuntimeDialogVisible(dialog, v) {
    const element = document.getElementById(dialog + 'RuntimeDialog');
    if (v) {
        element.classList.add('show');
    } else {
        element.classList.remove('show');
    }
}