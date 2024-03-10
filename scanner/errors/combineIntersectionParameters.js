function combineIntersectionParameters(left, right, mapper) {
                const leftCount = getParameterCount(left);
                const rightCount = getParameterCount(right);
                const longest = leftCount >= rightCount ? left : right;
                const shorter = longest === left ? right : left;
                const longestCount = longest === left ? leftCount : rightCount;
                const eitherHasEffectiveRest = hasEffectiveRestParameter(left) || hasEffectiveRestParameter(right);
                const needsExtraRestElement = eitherHasEffectiveRest && !hasEffectiveRestParameter(longest);
                const params = new Array(longestCount + (needsExtraRestElement ? 1 : 0));
                for (let i = 0; i < longestCount; i++) {
                    let longestParamType = tryGetTypeAtPosition(longest, i);
                    if (longest === right) {
                        longestParamType = instantiateType(longestParamType, mapper);
                    }
                    let shorterParamType = tryGetTypeAtPosition(shorter, i) || unknownType;
                    if (shorter === right) {
                        shorterParamType = instantiateType(shorterParamType, mapper);
                    }
                    const unionParamType = getUnionType([longestParamType, shorterParamType]);
                    const isRestParam = eitherHasEffectiveRest && !needsExtraRestElement && i === longestCount - 1;
                    const isOptional = i >= getMinArgumentCount(longest) && i >= getMinArgumentCount(shorter);
                    const leftName = i >= leftCount ? void 0 : getParameterNameAtPosition(left, i);
                    const rightName = i >= rightCount ? void 0 : getParameterNameAtPosition(right, i);
                    const paramName = leftName === rightName ? leftName : !leftName ? rightName : !rightName ? leftName : void 0;
                    const paramSymbol = createSymbol(1 /* FunctionScopedVariable */ | (isOptional && !isRestParam ? 16777216 /* Optional */ : 0), paramName || `arg${i}`);
                    paramSymbol.links.type = isRestParam ? createArrayType(unionParamType) : unionParamType;
                    params[i] = paramSymbol;
                }
                if (needsExtraRestElement) {
                    const restParamSymbol = createSymbol(1 /* FunctionScopedVariable */, "args");
                    restParamSymbol.links.type = createArrayType(getTypeAtPosition(shorter, longestCount));
                    if (shorter === right) {
                        restParamSymbol.links.type = instantiateType(restParamSymbol.links.type, mapper);
                    }
                    params[longestCount] = restParamSymbol;
                }
                return params;
            }