function combineUsages(usages) {
                const combinedProperties = /* @__PURE__ */ new Map();
                for (const u of usages) {
                    if (u.properties) {
                        u.properties.forEach((p, name) => {
                            if (!combinedProperties.has(name)) {
                                combinedProperties.set(name, []);
                            }
                            combinedProperties.get(name).push(p);
                        });
                    }
                }
                const properties = /* @__PURE__ */ new Map();
                combinedProperties.forEach((ps, name) => {
                    properties.set(name, combineUsages(ps));
                });
                return {
                    isNumber: usages.some((u) => u.isNumber),
                    isString: usages.some((u) => u.isString),
                    isNumberOrString: usages.some((u) => u.isNumberOrString),
                    candidateTypes: flatMap(usages, (u) => u.candidateTypes),
                    properties,
                    calls: flatMap(usages, (u) => u.calls),
                    constructs: flatMap(usages, (u) => u.constructs),
                    numberIndex: forEach(usages, (u) => u.numberIndex),
                    stringIndex: forEach(usages, (u) => u.stringIndex),
                    candidateThisTypes: flatMap(usages, (u) => u.candidateThisTypes),
                    inferredTypes: void 0
                    // clear type cache
                };
            }