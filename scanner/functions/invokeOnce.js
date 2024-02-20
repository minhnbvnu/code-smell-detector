function invokeOnce(source, target, action) {
                    const key = source.id + "," + target.id;
                    const status = visited && visited.get(key);
                    if (status !== void 0) {
                        inferencePriority = Math.min(inferencePriority, status);
                        return;
                    }
                    (visited || (visited = /* @__PURE__ */ new Map())).set(key, -1 /* Circularity */);
                    const saveInferencePriority = inferencePriority;
                    inferencePriority = 2048 /* MaxValue */;
                    const saveExpandingFlags = expandingFlags;
                    const sourceIdentity = getRecursionIdentity(source);
                    const targetIdentity = getRecursionIdentity(target);
                    if (contains(sourceStack, sourceIdentity))
                        expandingFlags |= 1 /* Source */;
                    if (contains(targetStack, targetIdentity))
                        expandingFlags |= 2 /* Target */;
                    if (expandingFlags !== 3 /* Both */) {
                        (sourceStack || (sourceStack = [])).push(sourceIdentity);
                        (targetStack || (targetStack = [])).push(targetIdentity);
                        action(source, target);
                        targetStack.pop();
                        sourceStack.pop();
                    }
                    else {
                        inferencePriority = -1 /* Circularity */;
                    }
                    expandingFlags = saveExpandingFlags;
                    visited.set(key, inferencePriority);
                    inferencePriority = Math.min(inferencePriority, saveInferencePriority);
                }