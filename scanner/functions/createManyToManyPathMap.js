function createManyToManyPathMap() {
                        function create2(forward, reverse, deleted) {
                            const map2 = {
                                getKeys: (v) => reverse.get(v),
                                getValues: (k) => forward.get(k),
                                keys: () => forward.keys(),
                                deleteKey: (k) => {
                                    (deleted || (deleted = /* @__PURE__ */ new Set())).add(k);
                                    const set = forward.get(k);
                                    if (!set) {
                                        return false;
                                    }
                                    set.forEach((v) => deleteFromMultimap(reverse, v, k));
                                    forward.delete(k);
                                    return true;
                                },
                                set: (k, vSet) => {
                                    deleted == null ? void 0 : deleted.delete(k);
                                    const existingVSet = forward.get(k);
                                    forward.set(k, vSet);
                                    existingVSet == null ? void 0 : existingVSet.forEach((v) => {
                                        if (!vSet.has(v)) {
                                            deleteFromMultimap(reverse, v, k);
                                        }
                                    });
                                    vSet.forEach((v) => {
                                        if (!(existingVSet == null ? void 0 : existingVSet.has(v))) {
                                            addToMultimap(reverse, v, k);
                                        }
                                    });
                                    return map2;
                                }
                            };
                            return map2;
                        }
                        return create2(
                        /* @__PURE__ */ new Map(), 
                        /* @__PURE__ */ new Map(), 
                        /*deleted*/
                        void 0);
                    }