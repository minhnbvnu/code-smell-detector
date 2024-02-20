function memoizeOne(callback) {
            const map2 = /* @__PURE__ */ new Map();
            return (arg) => {
                const key = `${typeof arg}:${arg}`;
                let value = map2.get(key);
                if (value === void 0 && !map2.has(key)) {
                    value = callback(arg);
                    map2.set(key, value);
                }
                return value;
            };
        }