function defineStartEndAsError(objName, node) {
        Object.defineProperties(node, {
            start: {
                get() {
                    throw new Error(`Use ${objName}.range[0] instead of ${objName}.start`);
                },
                configurable: true,
                enumerable: false
            },
            end: {
                get() {
                    throw new Error(`Use ${objName}.range[1] instead of ${objName}.end`);
                },
                configurable: true,
                enumerable: false
            }
        });
    }