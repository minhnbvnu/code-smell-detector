function mapDefinedEntries(map2, f) {
            if (!map2) {
                return void 0;
            }
            const result = /* @__PURE__ */ new Map();
            map2.forEach((value, key) => {
                const entry = f(key, value);
                if (entry !== void 0) {
                    const [newKey, newValue] = entry;
                    if (newKey !== void 0 && newValue !== void 0) {
                        result.set(newKey, newValue);
                    }
                }
            });
            return result;
        }