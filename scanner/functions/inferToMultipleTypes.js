function inferToMultipleTypes(source, targets, targetFlags) {
                    let typeVariableCount = 0;
                    if (targetFlags & 1048576 /* Union */) {
                        let nakedTypeVariable;
                        const sources = source.flags & 1048576 /* Union */ ? source.types : [source];
                        const matched = new Array(sources.length);
                        let inferenceCircularity = false;
                        for (const t of targets) {
                            if (getInferenceInfoForType(t)) {
                                nakedTypeVariable = t;
                                typeVariableCount++;
                            }
                            else {
                                for (let i = 0; i < sources.length; i++) {
                                    const saveInferencePriority = inferencePriority;
                                    inferencePriority = 2048 /* MaxValue */;
                                    inferFromTypes(sources[i], t);
                                    if (inferencePriority === priority)
                                        matched[i] = true;
                                    inferenceCircularity = inferenceCircularity || inferencePriority === -1 /* Circularity */;
                                    inferencePriority = Math.min(inferencePriority, saveInferencePriority);
                                }
                            }
                        }
                        if (typeVariableCount === 0) {
                            const intersectionTypeVariable = getSingleTypeVariableFromIntersectionTypes(targets);
                            if (intersectionTypeVariable) {
                                inferWithPriority(source, intersectionTypeVariable, 1 /* NakedTypeVariable */);
                            }
                            return;
                        }
                        if (typeVariableCount === 1 && !inferenceCircularity) {
                            const unmatched = flatMap(sources, (s, i) => matched[i] ? void 0 : s);
                            if (unmatched.length) {
                                inferFromTypes(getUnionType(unmatched), nakedTypeVariable);
                                return;
                            }
                        }
                    }
                    else {
                        for (const t of targets) {
                            if (getInferenceInfoForType(t)) {
                                typeVariableCount++;
                            }
                            else {
                                inferFromTypes(source, t);
                            }
                        }
                    }
                    if (targetFlags & 2097152 /* Intersection */ ? typeVariableCount === 1 : typeVariableCount > 0) {
                        for (const t of targets) {
                            if (getInferenceInfoForType(t)) {
                                inferWithPriority(source, t, 1 /* NakedTypeVariable */);
                            }
                        }
                    }
                }