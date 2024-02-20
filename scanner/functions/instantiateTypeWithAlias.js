function instantiateTypeWithAlias(type, mapper, aliasSymbol, aliasTypeArguments) {
                var _a2;
                if (!couldContainTypeVariables(type)) {
                    return type;
                }
                if (instantiationDepth === 100 || instantiationCount >= 5e6) {
                    (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "instantiateType_DepthLimit", { typeId: type.id, instantiationDepth, instantiationCount });
                    error(currentNode, Diagnostics.Type_instantiation_is_excessively_deep_and_possibly_infinite);
                    return errorType;
                }
                totalInstantiationCount++;
                instantiationCount++;
                instantiationDepth++;
                const result = instantiateTypeWorker(type, mapper, aliasSymbol, aliasTypeArguments);
                instantiationDepth--;
                return result;
            }