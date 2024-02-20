function onSplitterMouseMove(event)
    {
        var win = document.all
            ? event.srcElement.ownerDocument.parentWindow
            : event.target.ownerDocument.defaultView;

        var clientY = event.clientY;
        if (win != win.parent)
            clientY += win.frameElement ? win.frameElement.offsetTop : 0;
        
        var height = consoleFrame.offsetTop + consoleFrame.clientHeight;
        var y = height - clientY;
        
        consoleFrame.style.height = y + "px";
        layout();
    }