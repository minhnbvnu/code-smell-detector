function getIterationTypesOfIterable(type, use, errorNode) {
                var _a2, _b;
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                if (!(type.flags & 1048576 /* Union */)) {
                    const errorOutputContainer = errorNode ? { errors: void 0 } : void 0;
                    const iterationTypes2 = getIterationTypesOfIterableWorker(type, use, errorNode, errorOutputContainer);
                    if (iterationTypes2 === noIterationTypes) {
                        if (errorNode) {
                            const rootDiag = reportTypeNotIterableError(errorNode, type, !!(use & 2 /* AllowsAsyncIterablesFlag */));
                            if (errorOutputContainer == null ? void 0 : errorOutputContainer.errors) {
                                addRelatedInfo(rootDiag, ...errorOutputContainer.errors);
                            }
                        }
                        return void 0;
                    }
                    else if ((_a2 = errorOutputContainer == null ? void 0 : errorOutputContainer.errors) == null ? void 0 : _a2.length) {
                        for (const diag2 of errorOutputContainer.errors) {
                            diagnostics.add(diag2);
                        }
                    }
                    return iterationTypes2;
                }
                const cacheKey = use & 2 /* AllowsAsyncIterablesFlag */ ? "iterationTypesOfAsyncIterable" : "iterationTypesOfIterable";
                const cachedTypes2 = getCachedIterationTypes(type, cacheKey);
                if (cachedTypes2)
                    return cachedTypes2 === noIterationTypes ? void 0 : cachedTypes2;
                let allIterationTypes;
                for (const constituent of type.types) {
                    const errorOutputContainer = errorNode ? { errors: void 0 } : void 0;
                    const iterationTypes2 = getIterationTypesOfIterableWorker(constituent, use, errorNode, errorOutputContainer);
                    if (iterationTypes2 === noIterationTypes) {
                        if (errorNode) {
                            const rootDiag = reportTypeNotIterableError(errorNode, type, !!(use & 2 /* AllowsAsyncIterablesFlag */));
                            if (errorOutputContainer == null ? void 0 : errorOutputContainer.errors) {
                                addRelatedInfo(rootDiag, ...errorOutputContainer.errors);
                            }
                        }
                        setCachedIterationTypes(type, cacheKey, noIterationTypes);
                        return void 0;
                    }
                    else if ((_b = errorOutputContainer == null ? void 0 : errorOutputContainer.errors) == null ? void 0 : _b.length) {
                        for (const diag2 of errorOutputContainer.errors) {
                            diagnostics.add(diag2);
                        }
                    }
                    allIterationTypes = append(allIterationTypes, iterationTypes2);
                }
                const iterationTypes = allIterationTypes ? combineIterationTypes(allIterationTypes) : noIterationTypes;
                setCachedIterationTypes(type, cacheKey, iterationTypes);
                return iterationTypes === noIterationTypes ? void 0 : iterationTypes;
            }