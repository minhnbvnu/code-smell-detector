function buildOverload(name) {
            return {
                overload: (overloads) => ({
                    bind: (binder2) => ({
                        finish: () => createOverload(name, overloads, binder2),
                        deprecate: (deprecations) => ({
                            finish: () => createOverload(name, overloads, binder2, deprecations)
                        })
                    })
                })
            };
        }