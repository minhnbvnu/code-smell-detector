function inferFromSignatures(genericSig, usageSig, typeParameter) {
                var _a2;
                const types = [];
                for (let i = 0; i < genericSig.parameters.length; i++) {
                    const genericParam = genericSig.parameters[i];
                    const usageParam = usageSig.parameters[i];
                    const isRest = genericSig.declaration && isRestParameter(genericSig.declaration.parameters[i]);
                    if (!usageParam) {
                        break;
                    }
                    let genericParamType = genericParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(genericParam, genericParam.valueDeclaration) : checker.getAnyType();
                    const elementType = isRest && checker.getElementTypeOfArrayType(genericParamType);
                    if (elementType) {
                        genericParamType = elementType;
                    }
                    const targetType = ((_a2 = tryCast(usageParam, isTransientSymbol)) == null ? void 0 : _a2.links.type) || (usageParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(usageParam, usageParam.valueDeclaration) : checker.getAnyType());
                    types.push(...inferTypeParameters(genericParamType, targetType, typeParameter));
                }
                const genericReturn = checker.getReturnTypeOfSignature(genericSig);
                const usageReturn = checker.getReturnTypeOfSignature(usageSig);
                types.push(...inferTypeParameters(genericReturn, usageReturn, typeParameter));
                return types;
            }