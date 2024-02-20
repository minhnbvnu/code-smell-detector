function parseTypeAnnotatableIdentifier(requireTypeAnnotation, canBeOptionalParam) {
        var marker = markerCreate(),
            ident = parseVariableIdentifier(),
            isOptionalParam = false;

        if (canBeOptionalParam && match('?')) {
            expect('?');
            isOptionalParam = true;
        }

        if (requireTypeAnnotation || match(':')) {
            ident.typeAnnotation = parseTypeAnnotation();
            ident = markerApply(marker, ident);
        }

        if (isOptionalParam) {
            ident.optional = true;
            ident = markerApply(marker, ident);
        }

        return ident;
    }