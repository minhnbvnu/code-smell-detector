function addToMultimap(map2, k, v) {
                        let set = map2.get(k);
                        if (!set) {
                            set = /* @__PURE__ */ new Set();
                            map2.set(k, set);
                        }
                        set.add(v);
                    }