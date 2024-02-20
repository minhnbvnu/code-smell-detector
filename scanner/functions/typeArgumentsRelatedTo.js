function typeArgumentsRelatedTo(sources = emptyArray, targets = emptyArray, variances = emptyArray, reportErrors2, intersectionState) {
                    if (sources.length !== targets.length && relation === identityRelation) {
                        return 0 /* False */;
                    }
                    const length2 = sources.length <= targets.length ? sources.length : targets.length;
                    let result2 = -1 /* True */;
                    for (let i = 0; i < length2; i++) {
                        const varianceFlags = i < variances.length ? variances[i] : 1 /* Covariant */;
                        const variance = varianceFlags & 7 /* VarianceMask */;
                        if (variance !== 4 /* Independent */) {
                            const s = sources[i];
                            const t = targets[i];
                            let related = -1 /* True */;
                            if (varianceFlags & 8 /* Unmeasurable */) {
                                related = relation === identityRelation ? isRelatedTo(s, t, 3 /* Both */, 
                                /*reportErrors*/
                                false) : compareTypesIdentical(s, t);
                            }
                            else if (variance === 1 /* Covariant */) {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 2 /* Contravariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 3 /* Bivariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, 
                                /*reportErrors*/
                                false);
                                if (!related) {
                                    related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            else {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (related) {
                                    related &= isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }