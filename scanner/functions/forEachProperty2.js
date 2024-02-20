function forEachProperty2(prop, callback) {
                if (getCheckFlags(prop) & 6 /* Synthetic */) {
                    for (const t of prop.links.containingType.types) {
                        const p = getPropertyOfType(t, prop.escapedName);
                        const result = p && forEachProperty2(p, callback);
                        if (result) {
                            return result;
                        }
                    }
                    return void 0;
                }
                return callback(prop);
            }