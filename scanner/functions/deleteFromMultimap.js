function deleteFromMultimap(map2, k, v) {
                        const set = map2.get(k);
                        if (set == null ? void 0 : set.delete(v)) {
                            if (!set.size) {
                                map2.delete(k);
                            }
                            return true;
                        }
                        return false;
                    }