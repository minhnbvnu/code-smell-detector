function getWellKnownSymbolPropertyOfType(type, wellKnownSymbolName, checker) {
        const prefix = '__@' + wellKnownSymbolName;
        for (const prop of type.getProperties()) {
            if (!prop.name.startsWith(prefix))
                continue;
            const globalSymbol = checker.getApparentType(checker.getTypeAtLocation(prop.valueDeclaration.name.expression)).symbol;
            if (prop.escapedName === getPropertyNameOfWellKnownSymbol(checker, globalSymbol, wellKnownSymbolName))
                return prop;
        }
        return;
    }