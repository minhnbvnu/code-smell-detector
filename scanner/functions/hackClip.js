function hackClip() {
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = '1';
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    document.body.removeChild(transfer);
}