function arrayToMap(array, makeKey, makeValue = identity) {
            const result = /* @__PURE__ */ new Map();
            for (const value of array) {
                const key = makeKey(value);
                if (key !== void 0)
                    result.set(key, makeValue(value));
            }
            return result;
        }