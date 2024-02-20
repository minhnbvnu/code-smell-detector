function memoizeWeak(callback) {
            const map2 = /* @__PURE__ */ new WeakMap();
            return (arg) => {
                let value = map2.get(arg);
                if (value === void 0 && !map2.has(arg)) {
                    value = callback(arg);
                    map2.set(arg, value);
                }
                return value;
            };
        }