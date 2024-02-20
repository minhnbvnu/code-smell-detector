function isTypeReadonlyArrayOrTuple(checker, type, options, seenTypes) {
        function checkTypeArguments(arrayType) {
            var _a;
            const typeArguments = 
            // getTypeArguments was only added in TS3.7
            checker.getTypeArguments
                ? checker.getTypeArguments(arrayType)
                : (_a = arrayType.typeArguments) !== null && _a !== void 0 ? _a : [];
            // this shouldn't happen in reality as:
            // - tuples require at least 1 type argument
            // - ReadonlyArray requires at least 1 type argument
            /* istanbul ignore if */ if (typeArguments.length === 0) {
                return 3 /* Readonlyness.Readonly */;
            }
            // validate the element types are also readonly
            if (typeArguments.some(typeArg => isTypeReadonlyRecurser(checker, typeArg, options, seenTypes) ===
                2 /* Readonlyness.Mutable */)) {
                return 2 /* Readonlyness.Mutable */;
            }
            return 3 /* Readonlyness.Readonly */;
        }
        if (checker.isArrayType(type)) {
            const symbol = utils_1.ESLintUtils.nullThrows(type.getSymbol(), utils_1.ESLintUtils.NullThrowsReasons.MissingToken('symbol', 'array type'));
            const escapedName = symbol.getEscapedName();
            if (escapedName === 'Array') {
                return 2 /* Readonlyness.Mutable */;
            }
            return checkTypeArguments(type);
        }
        if (checker.isTupleType(type)) {
            if (!type.target.readonly) {
                return 2 /* Readonlyness.Mutable */;
            }
            return checkTypeArguments(type);
        }
        return 1 /* Readonlyness.UnknownType */;
    }