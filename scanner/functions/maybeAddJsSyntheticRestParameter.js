function maybeAddJsSyntheticRestParameter(declaration, parameters) {
                if (isJSDocSignature(declaration) || !containsArgumentsReference(declaration)) {
                    return false;
                }
                const lastParam = lastOrUndefined(declaration.parameters);
                const lastParamTags = lastParam ? getJSDocParameterTags(lastParam) : getJSDocTags(declaration).filter(isJSDocParameterTag);
                const lastParamVariadicType = firstDefined(lastParamTags, (p) => p.typeExpression && isJSDocVariadicType(p.typeExpression.type) ? p.typeExpression.type : void 0);
                const syntheticArgsSymbol = createSymbol(3 /* Variable */, "args", 32768 /* RestParameter */);
                if (lastParamVariadicType) {
                    syntheticArgsSymbol.links.type = createArrayType(getTypeFromTypeNode(lastParamVariadicType.type));
                }
                else {
                    syntheticArgsSymbol.links.checkFlags |= 65536 /* DeferredType */;
                    syntheticArgsSymbol.links.deferralParent = neverType;
                    syntheticArgsSymbol.links.deferralConstituents = [anyArrayType];
                    syntheticArgsSymbol.links.deferralWriteConstituents = [anyArrayType];
                }
                if (lastParamVariadicType) {
                    parameters.pop();
                }
                parameters.push(syntheticArgsSymbol);
                return true;
            }