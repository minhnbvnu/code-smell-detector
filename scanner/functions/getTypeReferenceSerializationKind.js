function getTypeReferenceSerializationKind(typeNameIn, location) {
                var _a2;
                const typeName = getParseTreeNode(typeNameIn, isEntityName);
                if (!typeName)
                    return 0 /* Unknown */;
                if (location) {
                    location = getParseTreeNode(location);
                    if (!location)
                        return 0 /* Unknown */;
                }
                let isTypeOnly = false;
                if (isQualifiedName(typeName)) {
                    const rootValueSymbol = resolveEntityName(getFirstIdentifier(typeName), 111551 /* Value */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    true, location);
                    isTypeOnly = !!((_a2 = rootValueSymbol == null ? void 0 : rootValueSymbol.declarations) == null ? void 0 : _a2.every(isTypeOnlyImportOrExportDeclaration));
                }
                const valueSymbol = resolveEntityName(typeName, 111551 /* Value */, 
                /*ignoreErrors*/
                true, 
                /*dontResolveAlias*/
                true, location);
                const resolvedSymbol = valueSymbol && valueSymbol.flags & 2097152 /* Alias */ ? resolveAlias(valueSymbol) : valueSymbol;
                isTypeOnly || (isTypeOnly = !!(valueSymbol && getTypeOnlyAliasDeclaration(valueSymbol, 111551 /* Value */)));
                const typeSymbol = resolveEntityName(typeName, 788968 /* Type */, 
                /*ignoreErrors*/
                true, 
                /*dontResolveAlias*/
                false, location);
                if (resolvedSymbol && resolvedSymbol === typeSymbol) {
                    const globalPromiseSymbol = getGlobalPromiseConstructorSymbol(
                    /*reportErrors*/
                    false);
                    if (globalPromiseSymbol && resolvedSymbol === globalPromiseSymbol) {
                        return 9 /* Promise */;
                    }
                    const constructorType = getTypeOfSymbol(resolvedSymbol);
                    if (constructorType && isConstructorType(constructorType)) {
                        return isTypeOnly ? 10 /* TypeWithCallSignature */ : 1 /* TypeWithConstructSignatureAndValue */;
                    }
                }
                if (!typeSymbol) {
                    return isTypeOnly ? 11 /* ObjectType */ : 0 /* Unknown */;
                }
                const type = getDeclaredTypeOfSymbol(typeSymbol);
                if (isErrorType(type)) {
                    return isTypeOnly ? 11 /* ObjectType */ : 0 /* Unknown */;
                }
                else if (type.flags & 3 /* AnyOrUnknown */) {
                    return 11 /* ObjectType */;
                }
                else if (isTypeAssignableToKind(type, 16384 /* Void */ | 98304 /* Nullable */ | 131072 /* Never */)) {
                    return 2 /* VoidNullableOrNeverType */;
                }
                else if (isTypeAssignableToKind(type, 528 /* BooleanLike */)) {
                    return 6 /* BooleanType */;
                }
                else if (isTypeAssignableToKind(type, 296 /* NumberLike */)) {
                    return 3 /* NumberLikeType */;
                }
                else if (isTypeAssignableToKind(type, 2112 /* BigIntLike */)) {
                    return 4 /* BigIntLikeType */;
                }
                else if (isTypeAssignableToKind(type, 402653316 /* StringLike */)) {
                    return 5 /* StringLikeType */;
                }
                else if (isTupleType(type)) {
                    return 7 /* ArrayLikeType */;
                }
                else if (isTypeAssignableToKind(type, 12288 /* ESSymbolLike */)) {
                    return 8 /* ESSymbolType */;
                }
                else if (isFunctionType(type)) {
                    return 10 /* TypeWithCallSignature */;
                }
                else if (isArrayType(type)) {
                    return 7 /* ArrayLikeType */;
                }
                else {
                    return 11 /* ObjectType */;
                }
            }