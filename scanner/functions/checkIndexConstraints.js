function checkIndexConstraints(type, symbol, isStaticIndex) {
                const indexInfos = getIndexInfosOfType(type);
                if (indexInfos.length === 0) {
                    return;
                }
                for (const prop of getPropertiesOfObjectType(type)) {
                    if (!(isStaticIndex && prop.flags & 4194304 /* Prototype */)) {
                        checkIndexConstraintForProperty(type, prop, getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */, 
                        /*includeNonPublic*/
                        true), getNonMissingTypeOfSymbol(prop));
                    }
                }
                const typeDeclaration = symbol.valueDeclaration;
                if (typeDeclaration && isClassLike(typeDeclaration)) {
                    for (const member of typeDeclaration.members) {
                        if (!isStatic(member) && !hasBindableName(member)) {
                            const symbol2 = getSymbolOfDeclaration(member);
                            checkIndexConstraintForProperty(type, symbol2, getTypeOfExpression(member.name.expression), getNonMissingTypeOfSymbol(symbol2));
                        }
                    }
                }
                if (indexInfos.length > 1) {
                    for (const info of indexInfos) {
                        checkIndexConstraintForIndexSignature(type, info);
                    }
                }
            }