function parseDeclareVariable() {
        var id, marker = markerCreate();
        expectContextualKeyword('declare');
        expectKeyword('var');
        id = parseTypeAnnotatableIdentifier();

        consumeSemicolon();

        return markerApply(marker, delegate.createDeclareVariable(
            id
        ));
    }