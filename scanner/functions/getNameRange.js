function getNameRange(variable) {
                const def = variable.defs[0];
                return def === null || def === void 0 ? void 0 : def.name.range;
            }