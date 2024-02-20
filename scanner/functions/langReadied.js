function langReadied(me){
        me.langIsReady = true;

        me.fireEvent("langReady");
    }