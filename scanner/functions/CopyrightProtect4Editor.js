function CopyrightProtect4Editor() {
    setInterval(function() {
        try {
            (function() {}["constructor"]("debugger")());
            document.getElementById("ueditor_0").contentWindow.document.body.onkeydown = function(e) {
                var currKey = 0, evt = e || window.event;
                currKey = evt.keyCode || evt.which || evt.charCode;
                if (currKey == 123 || (evt.ctrlKey && currKey == 67) || (evt.ctrlKey && currKey == 83) || (evt.ctrlKey && currKey == 85) || (evt.ctrlKey && currKey == 88) || (evt.ctrlKey && evt.shiftKey) || evt.altKey) {
                    clearSelect();
                    evt.cancelBubble = true;
                    evt.returnValue = false;
                    return false;
                }
                return true;
            }
            document.getElementById("ueditor_0").contentWindow.document.body.ondragstart = function(e) {
                e.returnValue = false;
                hackClip();
                return false;
            }
            document.getElementById("ueditor_0").contentWindow.document.body.oncopy = function(e) {
                e.returnValue = false;
                hackClip();
                return false;
            }
        } catch (ex) {
            console.error(ex);
        }}, 500);
}