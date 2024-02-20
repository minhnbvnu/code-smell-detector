function setCursorPos(newValue){
        cursorPos = newValue;
        var max = padValue().length;
        var min = max - ("" + value).length;
        if (cursorPos>max) cursorPos=max;
        if (cursorPos<min) cursorPos=min;
        me.refresh();
    }