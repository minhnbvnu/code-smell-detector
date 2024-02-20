function createNameAndKindSet() {
            const map2 = /* @__PURE__ */ new Map();
            function add(value) {
                const existing = map2.get(value.name);
                if (!existing || kindPrecedence[existing.kind] < kindPrecedence[value.kind]) {
                    map2.set(value.name, value);
                }
            }
            return {
                add,
                has: map2.has.bind(map2),
                values: map2.values.bind(map2)
            };
        }