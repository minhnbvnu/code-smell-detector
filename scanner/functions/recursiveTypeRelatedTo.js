function recursiveTypeRelatedTo(source2, target2, reportErrors2, intersectionState, recursionFlags) {
                    var _a3, _b, _c;
                    if (overflow) {
                        return 0 /* False */;
                    }
                    const id = getRelationKey(source2, target2, intersectionState, relation, 
                    /*ingnoreConstraints*/
                    false);
                    const entry = relation.get(id);
                    if (entry !== void 0) {
                        if (reportErrors2 && entry & 2 /* Failed */ && !(entry & 4 /* Reported */)) {
                        }
                        else {
                            if (outofbandVarianceMarkerHandler) {
                                const saved = entry & 24 /* ReportsMask */;
                                if (saved & 8 /* ReportsUnmeasurable */) {
                                    instantiateType(source2, reportUnmeasurableMapper);
                                }
                                if (saved & 16 /* ReportsUnreliable */) {
                                    instantiateType(source2, reportUnreliableMapper);
                                }
                            }
                            return entry & 1 /* Succeeded */ ? -1 /* True */ : 0 /* False */;
                        }
                    }
                    if (!maybeKeys) {
                        maybeKeys = [];
                        sourceStack = [];
                        targetStack = [];
                    }
                    else {
                        const broadestEquivalentId = id.startsWith("*") ? getRelationKey(source2, target2, intersectionState, relation, 
                        /*ignoreConstraints*/
                        true) : void 0;
                        for (let i = 0; i < maybeCount; i++) {
                            if (id === maybeKeys[i] || broadestEquivalentId && broadestEquivalentId === maybeKeys[i]) {
                                return 3 /* Maybe */;
                            }
                        }
                        if (sourceDepth === 100 || targetDepth === 100) {
                            overflow = true;
                            return 0 /* False */;
                        }
                    }
                    const maybeStart = maybeCount;
                    maybeKeys[maybeCount] = id;
                    maybeCount++;
                    const saveExpandingFlags = expandingFlags;
                    if (recursionFlags & 1 /* Source */) {
                        sourceStack[sourceDepth] = source2;
                        sourceDepth++;
                        if (!(expandingFlags & 1 /* Source */) && isDeeplyNestedType(source2, sourceStack, sourceDepth))
                            expandingFlags |= 1 /* Source */;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetStack[targetDepth] = target2;
                        targetDepth++;
                        if (!(expandingFlags & 2 /* Target */) && isDeeplyNestedType(target2, targetStack, targetDepth))
                            expandingFlags |= 2 /* Target */;
                    }
                    let originalHandler;
                    let propagatingVarianceFlags = 0;
                    if (outofbandVarianceMarkerHandler) {
                        originalHandler = outofbandVarianceMarkerHandler;
                        outofbandVarianceMarkerHandler = (onlyUnreliable) => {
                            propagatingVarianceFlags |= onlyUnreliable ? 16 /* ReportsUnreliable */ : 8 /* ReportsUnmeasurable */;
                            return originalHandler(onlyUnreliable);
                        };
                    }
                    let result2;
                    if (expandingFlags === 3 /* Both */) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "recursiveTypeRelatedTo_DepthLimit", {
                            sourceId: source2.id,
                            sourceIdStack: sourceStack.map((t) => t.id),
                            targetId: target2.id,
                            targetIdStack: targetStack.map((t) => t.id),
                            depth: sourceDepth,
                            targetDepth
                        });
                        result2 = 3 /* Maybe */;
                    }
                    else {
                        (_b = tracing) == null ? void 0 : _b.push(tracing.Phase.CheckTypes, "structuredTypeRelatedTo", { sourceId: source2.id, targetId: target2.id });
                        result2 = structuredTypeRelatedTo(source2, target2, reportErrors2, intersectionState);
                        (_c = tracing) == null ? void 0 : _c.pop();
                    }
                    if (outofbandVarianceMarkerHandler) {
                        outofbandVarianceMarkerHandler = originalHandler;
                    }
                    if (recursionFlags & 1 /* Source */) {
                        sourceDepth--;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetDepth--;
                    }
                    expandingFlags = saveExpandingFlags;
                    if (result2) {
                        if (result2 === -1 /* True */ || sourceDepth === 0 && targetDepth === 0) {
                            if (result2 === -1 /* True */ || result2 === 3 /* Maybe */) {
                                for (let i = maybeStart; i < maybeCount; i++) {
                                    relation.set(maybeKeys[i], 1 /* Succeeded */ | propagatingVarianceFlags);
                                }
                            }
                            maybeCount = maybeStart;
                        }
                    }
                    else {
                        relation.set(id, (reportErrors2 ? 4 /* Reported */ : 0) | 2 /* Failed */ | propagatingVarianceFlags);
                        maybeCount = maybeStart;
                    }
                    return result2;
                }