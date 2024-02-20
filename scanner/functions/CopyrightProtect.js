function CopyrightProtect() {
    setInterval(function() {
            try {
                (function() {}["constructor"]("debugger")());
                $(".article-content").on("keydown", function(e) {
                    var currKey = 0, evt = e || window.event;
                    currKey = evt.keyCode || evt.which || evt.charCode;
                    if (currKey == 123 || (evt.ctrlKey && currKey == 67) || (evt.ctrlKey && currKey == 83) || (evt.ctrlKey && currKey == 85)) { //禁止F12，Ctrl+C，Ctrl+U
                        clearSelect();
                        evt.cancelBubble = true;
                        evt.returnValue = false;
                        return true;
                    }
                });
                document.onkeydown = function(e) {
                    var currKey = 0, evt = e || window.event;
                    currKey = evt.keyCode || evt.which || evt.charCode;
                    if (currKey == 123 || (evt.ctrlKey && currKey == 65) || (evt.ctrlKey && currKey == 83) || (evt.ctrlKey && currKey == 85) || (evt.ctrlKey && evt.shiftKey) || evt.altKey) {
                        clearSelect();
                        evt.cancelBubble = true;
                        evt.returnValue = false;
                        return false;
                    }
                    return true;
                }
                document.ondragstart = function(e) {
                    e.returnValue = false;
                    hackClip();
                    return false;
                }
                $(".article-content").on("copy", function(e) {
                    e.returnValue = false;
                    hackClip();
                    return false;
                });
                document.oncontextmenu = function(e) {
                    e.returnValue = false;
                    hackClip();
                    return false;
                }
            } catch (ex) {
                console.error(ex);
            }
        }, 500);
}