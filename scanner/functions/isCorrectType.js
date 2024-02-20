function isCorrectType(node, config, context, selector) {
        if (config.types == null) {
            return true;
        }
        if ((SelectorsAllowedToHaveTypes & selector) === 0) {
            return true;
        }
        const { esTreeNodeToTSNodeMap, program } = util.getParserServices(context);
        const checker = program.getTypeChecker();
        const tsNode = esTreeNodeToTSNodeMap.get(node);
        const type = checker
            .getTypeAtLocation(tsNode)
            // remove null and undefined from the type, as we don't care about it here
            .getNonNullableType();
        for (const allowedType of config.types) {
            switch (allowedType) {
                case enums_1.TypeModifiers.array:
                    if (isAllTypesMatch(type, t => checker.isArrayType(t) || checker.isTupleType(t))) {
                        return true;
                    }
                    break;
                case enums_1.TypeModifiers.function:
                    if (isAllTypesMatch(type, t => t.getCallSignatures().length > 0)) {
                        return true;
                    }
                    break;
                case enums_1.TypeModifiers.boolean:
                case enums_1.TypeModifiers.number:
                case enums_1.TypeModifiers.string: {
                    const typeString = checker.typeToString(
                    // this will resolve things like true => boolean, 'a' => string and 1 => number
                    checker.getWidenedType(checker.getBaseTypeOfLiteralType(type)));
                    const allowedTypeString = enums_1.TypeModifiers[allowedType];
                    if (typeString === allowedTypeString) {
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    }