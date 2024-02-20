function html5Support(){
    var audioTagSupport = !!(document.createElement('audio').canPlayType);
    var contentEditableSupport = document.getElementById('textbox').contentEditable;
    var fileApiSupport = !!(window.FileReader);

    if (audioTagSupport && contentEditableSupport && fileApiSupport){
        return true;
    } else {
        return false;
    }
}