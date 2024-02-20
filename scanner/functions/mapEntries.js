function mapEntries(map2, f) {
            if (!map2) {
                return void 0;
            }
            const result = /* @__PURE__ */ new Map();
            map2.forEach((value, key) => {
                const [newKey, newValue] = f(key, value);
                result.set(newKey, newValue);
            });
            return result;
        }