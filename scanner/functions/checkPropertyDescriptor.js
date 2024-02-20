function checkPropertyDescriptor(node) {
                const namesToCheck = new Set(node.properties
                    .filter(p => p.type === "Property" && p.kind === "init" && !p.computed)
                    .map(({ key }) => key.name));
                const hasGetter = namesToCheck.has("get");
                const hasSetter = namesToCheck.has("set");
                if (checkSetWithoutGet && hasSetter && !hasGetter) {
                    report(node, "missingGetter");
                }
                if (checkGetWithoutSet && hasGetter && !hasSetter) {
                    report(node, "missingSetter");
                }
            }