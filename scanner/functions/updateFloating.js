function updateFloating(){
        var rect3 = getPosition(me.container);
        var offset=me.options.toolbarTopOffset||0;
        if (rect3.top < 0 && rect3.bottom - toolbarBox.offsetHeight > offset) {
            setFloating();
        }else{
            unsetFloating();
        }
    }