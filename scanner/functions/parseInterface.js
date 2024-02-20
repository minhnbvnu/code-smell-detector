function parseInterface() {
        var marker = markerCreate();

        if (strict) {
            expectKeyword('interface');
        } else {
            expectContextualKeyword('interface');
        }

        return parseInterfaceish(marker, /* allowStatic */false);
    }