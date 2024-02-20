function showConfirmDialog(title, html, callback = noop, cancelCallback = noop, okLabel = 'OK', cancelLabel = 'Cancel') {
    onConfirmButtonClick.okCallback = callback;
    onConfirmButtonClick.cancelCallback = cancelCallback;

    document.getElementById('confirmTitle').innerHTML = title;
    document.getElementById('confirmMessage').innerHTML = html;
    document.getElementById('confirmOKButton').innerHTML = okLabel;

    const cancelButton = document.getElementById('confirmCancelButton');
    cancelButton.style.display = cancelLabel === '' ? 'none' : 'inline-block';
    cancelButton.innerHTML = cancelLabel;
    
    document.getElementById('confirmDialog').classList.remove('hidden');
}