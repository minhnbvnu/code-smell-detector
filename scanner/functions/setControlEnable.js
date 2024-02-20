function setControlEnable(ctrl, e) {
    var b = document.getElementById(ctrl + 'Button');
    if (b) { b.disabled = ! e; }

    var container = document.getElementById(ctrl + 'ButtonContainer');
    if (e) {
        container.classList.remove('disabled');
    } else {
        container.classList.add('disabled');
    }
}