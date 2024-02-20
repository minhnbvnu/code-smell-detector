function parseIntersectionType() {
        var marker = markerCreate(), type, types;
        type = parsePrefixType();
        types = [type];
        while (match('&')) {
            lex();
            types.push(parsePrefixType());
        }

        return types.length === 1 ?
                type :
                markerApply(marker, delegate.createIntersectionTypeAnnotation(
                    types
                ));
    }