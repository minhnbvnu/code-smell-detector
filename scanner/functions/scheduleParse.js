function scheduleParse(now) {
        if(editor.getValue() === oldInput) {
            return;
        }

        for(var i = 0; i < markers.length; i++) {
            editor.clearMarker(markers[i]);
        }

        // Reset state
        runState = {
            version: '1.2',
            entries: []
        };

        if(parseTimer !== null) {
            clearTimeout(parseTimer);
            parseTimer = null;
        }

        if(now) {
            parse();
        }
        else {
            parseTimer = setTimeout(function() {
                parse();
                parseTimer = null;
            }, 1000);
        }
    }