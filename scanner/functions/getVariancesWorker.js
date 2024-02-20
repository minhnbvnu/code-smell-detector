function getVariancesWorker(symbol, typeParameters = emptyArray) {
                var _a2, _b;
                const links = getSymbolLinks(symbol);
                if (!links.variances) {
                    (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.CheckTypes, "getVariancesWorker", { arity: typeParameters.length, id: getTypeId(getDeclaredTypeOfSymbol(symbol)) });
                    links.variances = emptyArray;
                    const variances = [];
                    for (const tp of typeParameters) {
                        const modifiers = getTypeParameterModifiers(tp);
                        let variance = modifiers & 65536 /* Out */ ? modifiers & 32768 /* In */ ? 0 /* Invariant */ : 1 /* Covariant */ : modifiers & 32768 /* In */ ? 2 /* Contravariant */ : void 0;
                        if (variance === void 0) {
                            let unmeasurable = false;
                            let unreliable = false;
                            const oldHandler = outofbandVarianceMarkerHandler;
                            outofbandVarianceMarkerHandler = (onlyUnreliable) => onlyUnreliable ? unreliable = true : unmeasurable = true;
                            const typeWithSuper = createMarkerType(symbol, tp, markerSuperType);
                            const typeWithSub = createMarkerType(symbol, tp, markerSubType);
                            variance = (isTypeAssignableTo(typeWithSub, typeWithSuper) ? 1 /* Covariant */ : 0) | (isTypeAssignableTo(typeWithSuper, typeWithSub) ? 2 /* Contravariant */ : 0);
                            if (variance === 3 /* Bivariant */ && isTypeAssignableTo(createMarkerType(symbol, tp, markerOtherType), typeWithSuper)) {
                                variance = 4 /* Independent */;
                            }
                            outofbandVarianceMarkerHandler = oldHandler;
                            if (unmeasurable || unreliable) {
                                if (unmeasurable) {
                                    variance |= 8 /* Unmeasurable */;
                                }
                                if (unreliable) {
                                    variance |= 16 /* Unreliable */;
                                }
                            }
                        }
                        variances.push(variance);
                    }
                    links.variances = variances;
                    (_b = tracing) == null ? void 0 : _b.pop({ variances: variances.map(Debug.formatVariance) });
                }
                return links.variances;
            }