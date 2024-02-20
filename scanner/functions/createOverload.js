function createOverload(name, overloads, binder2, deprecations) {
            Object.defineProperty(call, "name", { ...Object.getOwnPropertyDescriptor(call, "name"), value: name });
            if (deprecations) {
                for (const key of Object.keys(deprecations)) {
                    const index = +key;
                    if (!isNaN(index) && hasProperty(overloads, `${index}`)) {
                        overloads[index] = deprecate(overloads[index], { ...deprecations[index], name });
                    }
                }
            }
            const bind = createBinder2(overloads, binder2);
            return call;
            function call(...args) {
                const index = bind(args);
                const fn = index !== void 0 ? overloads[index] : void 0;
                if (typeof fn === "function") {
                    return fn(...args);
                }
                throw new TypeError("Invalid arguments");
            }
        }