function isTypeReadonlyObject(checker, type, options, seenTypes) {
        function checkIndexSignature(kind) {
            const indexInfo = checker.getIndexInfoOfType(type, kind);
            if (indexInfo) {
                if (!indexInfo.isReadonly) {
                    return 2 /* Readonlyness.Mutable */;
                }
                if (indexInfo.type === type || seenTypes.has(indexInfo.type)) {
                    return 3 /* Readonlyness.Readonly */;
                }
                return isTypeReadonlyRecurser(checker, indexInfo.type, options, seenTypes);
            }
            return 1 /* Readonlyness.UnknownType */;
        }
        const properties = type.getProperties();
        if (properties.length) {
            // ensure the properties are marked as readonly
            for (const property of properties) {
                if (options.treatMethodsAsReadonly) {
                    if (property.valueDeclaration !== undefined &&
                        hasSymbol(property.valueDeclaration) &&
                        (0, tsutils_1.isSymbolFlagSet)(property.valueDeclaration.symbol, ts.SymbolFlags.Method)) {
                        continue;
                    }
                    const declarations = property.getDeclarations();
                    const lastDeclaration = declarations !== undefined && declarations.length > 0
                        ? declarations[declarations.length - 1]
                        : undefined;
                    if (lastDeclaration !== undefined &&
                        hasSymbol(lastDeclaration) &&
                        (0, tsutils_1.isSymbolFlagSet)(lastDeclaration.symbol, ts.SymbolFlags.Method)) {
                        continue;
                    }
                }
                if ((0, tsutils_1.isPropertyReadonlyInType)(type, property.getEscapedName(), checker)) {
                    continue;
                }
                const name = ts.getNameOfDeclaration(property.valueDeclaration);
                if (name && ts.isPrivateIdentifier(name)) {
                    continue;
                }
                return 2 /* Readonlyness.Mutable */;
            }
            // all properties were readonly
            // now ensure that all of the values are readonly also.
            // do this after checking property readonly-ness as a perf optimization,
            // as we might be able to bail out early due to a mutable property before
            // doing this deep, potentially expensive check.
            for (const property of properties) {
                const propertyType = utils_1.ESLintUtils.nullThrows((0, propertyTypes_1.getTypeOfPropertyOfType)(checker, type, property), utils_1.ESLintUtils.NullThrowsReasons.MissingToken(`property "${property.name}"`, 'type'));
                // handle recursive types.
                // we only need this simple check, because a mutable recursive type will break via the above prop readonly check
                if (seenTypes.has(propertyType)) {
                    continue;
                }
                if (isTypeReadonlyRecurser(checker, propertyType, options, seenTypes) ===
                    2 /* Readonlyness.Mutable */) {
                    return 2 /* Readonlyness.Mutable */;
                }
            }
        }
        const isStringIndexSigReadonly = checkIndexSignature(ts.IndexKind.String);
        if (isStringIndexSigReadonly === 2 /* Readonlyness.Mutable */) {
            return isStringIndexSigReadonly;
        }
        const isNumberIndexSigReadonly = checkIndexSignature(ts.IndexKind.Number);
        if (isNumberIndexSigReadonly === 2 /* Readonlyness.Mutable */) {
            return isNumberIndexSigReadonly;
        }
        return 3 /* Readonlyness.Readonly */;
    }