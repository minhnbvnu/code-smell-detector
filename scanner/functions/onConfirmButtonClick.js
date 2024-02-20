function onConfirmButtonClick(ok) {
    document.getElementById('confirmDialog').classList.add('hidden');

    if (ok) {
        onConfirmButtonClick.okCallback();
    } else {
        onConfirmButtonClick.cancelCallback();
    }
}