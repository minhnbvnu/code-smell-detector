function isReadonlyPropertyFromMappedType(type, name, checker) {
        if (!type_1.isObjectType(type) || !util_1.isObjectFlagSet(type, ts.ObjectFlags.Mapped))
            return;
        const declaration = type.symbol.declarations[0];
        // well-known symbols are not affected by mapped types
        if (declaration.readonlyToken !== undefined && !/^__@[^@]+$/.test(name))
            return declaration.readonlyToken.kind !== ts.SyntaxKind.MinusToken;
        return isPropertyReadonlyInType(type.modifiersType, name, checker);
    }