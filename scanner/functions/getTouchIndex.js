function getTouchIndex (id) {

        var i = touches.length,
            t;
        while (i--) {
            t = touches[i];
            if (t.id === id) return i;
        }

        return -1;
        
    }