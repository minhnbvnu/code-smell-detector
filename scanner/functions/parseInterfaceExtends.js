function parseInterfaceExtends() {
        var marker = markerCreate(), id, typeParameters = null;

        id = parseVariableIdentifier();
        if (match('<')) {
            typeParameters = parseTypeParameterInstantiation();
        }

        return markerApply(marker, delegate.createInterfaceExtends(
            id,
            typeParameters
        ));
    }