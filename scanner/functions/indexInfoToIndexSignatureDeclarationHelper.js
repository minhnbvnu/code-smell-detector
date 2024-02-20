function indexInfoToIndexSignatureDeclarationHelper(indexInfo, context, typeNode) {
                    const name = getNameFromIndexInfo(indexInfo) || "x";
                    const indexerTypeNode = typeToTypeNodeHelper(indexInfo.keyType, context);
                    const indexingParameter = factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name, 
                    /*questionToken*/
                    void 0, indexerTypeNode, 
                    /*initializer*/
                    void 0);
                    if (!typeNode) {
                        typeNode = typeToTypeNodeHelper(indexInfo.type || anyType, context);
                    }
                    if (!indexInfo.type && !(context.flags & 2097152 /* AllowEmptyIndexInfoType */)) {
                        context.encounteredError = true;
                    }
                    context.approximateLength += name.length + 4;
                    return factory.createIndexSignature(indexInfo.isReadonly ? [factory.createToken(146 /* ReadonlyKeyword */)] : void 0, [indexingParameter], typeNode);
                }