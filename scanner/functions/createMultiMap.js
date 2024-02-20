function createMultiMap() {
            const map2 = /* @__PURE__ */ new Map();
            map2.add = multiMapAdd;
            map2.remove = multiMapRemove;
            return map2;
        }