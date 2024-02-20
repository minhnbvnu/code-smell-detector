function parseClassImplements() {
        var id, implemented = [], marker, typeParameters;
        if (strict) {
            expectKeyword('implements');
        } else {
            expectContextualKeyword('implements');
        }
        while (index < length) {
            marker = markerCreate();
            id = parseVariableIdentifier();
            if (match('<')) {
                typeParameters = parseTypeParameterInstantiation();
            } else {
                typeParameters = null;
            }
            implemented.push(markerApply(marker, delegate.createClassImplements(
                id,
                typeParameters
            )));
            if (!match(',')) {
                break;
            }
            expect(',');
        }
        return implemented;
    }