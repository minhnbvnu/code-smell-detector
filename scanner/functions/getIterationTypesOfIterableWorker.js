function getIterationTypesOfIterableWorker(type, use, errorNode, errorOutputContainer) {
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                let noCache = false;
                if (use & 2 /* AllowsAsyncIterablesFlag */) {
                    const iterationTypes = getIterationTypesOfIterableCached(type, asyncIterationTypesResolver) || getIterationTypesOfIterableFast(type, asyncIterationTypesResolver);
                    if (iterationTypes) {
                        if (iterationTypes === noIterationTypes && errorNode) {
                            noCache = true;
                        }
                        else {
                            return use & 8 /* ForOfFlag */ ? getAsyncFromSyncIterationTypes(iterationTypes, errorNode) : iterationTypes;
                        }
                    }
                }
                if (use & 1 /* AllowsSyncIterablesFlag */) {
                    let iterationTypes = getIterationTypesOfIterableCached(type, syncIterationTypesResolver) || getIterationTypesOfIterableFast(type, syncIterationTypesResolver);
                    if (iterationTypes) {
                        if (iterationTypes === noIterationTypes && errorNode) {
                            noCache = true;
                        }
                        else {
                            if (use & 2 /* AllowsAsyncIterablesFlag */) {
                                if (iterationTypes !== noIterationTypes) {
                                    iterationTypes = getAsyncFromSyncIterationTypes(iterationTypes, errorNode);
                                    return noCache ? iterationTypes : setCachedIterationTypes(type, "iterationTypesOfAsyncIterable", iterationTypes);
                                }
                            }
                            else {
                                return iterationTypes;
                            }
                        }
                    }
                }
                if (use & 2 /* AllowsAsyncIterablesFlag */) {
                    const iterationTypes = getIterationTypesOfIterableSlow(type, asyncIterationTypesResolver, errorNode, errorOutputContainer, noCache);
                    if (iterationTypes !== noIterationTypes) {
                        return iterationTypes;
                    }
                }
                if (use & 1 /* AllowsSyncIterablesFlag */) {
                    let iterationTypes = getIterationTypesOfIterableSlow(type, syncIterationTypesResolver, errorNode, errorOutputContainer, noCache);
                    if (iterationTypes !== noIterationTypes) {
                        if (use & 2 /* AllowsAsyncIterablesFlag */) {
                            iterationTypes = getAsyncFromSyncIterationTypes(iterationTypes, errorNode);
                            return noCache ? iterationTypes : setCachedIterationTypes(type, "iterationTypesOfAsyncIterable", iterationTypes);
                        }
                        else {
                            return iterationTypes;
                        }
                    }
                }
                return noIterationTypes;
            }