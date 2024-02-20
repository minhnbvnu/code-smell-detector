function getIteratorYieldResultFromIteratorResult(type, node, checker) {
        return type_1.isUnionType(type) && type.types.find((t) => {
            const done = t.getProperty('done');
            return done !== undefined &&
                isBooleanLiteralType(removeOptionalityFromType(checker, checker.getTypeOfSymbolAtLocation(done, node)), false);
        }) || type;
    }