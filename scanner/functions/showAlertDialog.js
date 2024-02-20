function showAlertDialog(title, html, callback = noop, okLabel = 'OK') {
    showConfirmDialog(title, html, callback, noop, okLabel, '');
}