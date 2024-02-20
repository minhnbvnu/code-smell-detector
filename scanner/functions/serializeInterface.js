function serializeInterface(symbol, symbolName2, modifierFlags) {
                        const interfaceType = getDeclaredTypeOfClassOrInterface(symbol);
                        const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                        const typeParamDecls = map(localParams, (p) => typeParameterToDeclaration(p, context));
                        const baseTypes = getBaseTypes(interfaceType);
                        const baseType = length(baseTypes) ? getIntersectionType(baseTypes) : void 0;
                        const members = flatMap(getPropertiesOfType(interfaceType), (p) => serializePropertySymbolForInterface(p, baseType));
                        const callSignatures = serializeSignatures(0 /* Call */, interfaceType, baseType, 176 /* CallSignature */);
                        const constructSignatures = serializeSignatures(1 /* Construct */, interfaceType, baseType, 177 /* ConstructSignature */);
                        const indexSignatures = serializeIndexSignatures(interfaceType, baseType);
                        const heritageClauses = !length(baseTypes) ? void 0 : [factory.createHeritageClause(94 /* ExtendsKeyword */, mapDefined(baseTypes, (b) => trySerializeAsTypeReference(b, 111551 /* Value */)))];
                        addResult(factory.createInterfaceDeclaration(
                        /*modifiers*/
                        void 0, getInternalSymbolName(symbol, symbolName2), typeParamDecls, heritageClauses, [...indexSignatures, ...constructSignatures, ...callSignatures, ...members]), modifierFlags);
                    }