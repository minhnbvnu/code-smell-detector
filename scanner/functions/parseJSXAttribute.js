function parseJSXAttribute() {
        var name, marker;

        if (match('{')) {
            return parseJSXSpreadAttribute();
        }

        marker = markerCreate();

        name = parseJSXAttributeName();

        // HTML empty attribute
        if (match('=')) {
            lex();
            return markerApply(marker, delegate.createJSXAttribute(name, parseJSXAttributeValue()));
        }

        return markerApply(marker, delegate.createJSXAttribute(name));
    }