function isCallback(checker, param, node) {
        let type = checker.getApparentType(checker.getTypeOfSymbolAtLocation(param, node));
        if (param.valueDeclaration.dotDotDotToken) {
            // unwrap array type of rest parameter
            type = type.getNumberIndexType();
            if (type === undefined)
                return false;
        }
        for (const t of unionTypeParts(type))
            if (t.getCallSignatures().length !== 0)
                return true;
        return false;
    }