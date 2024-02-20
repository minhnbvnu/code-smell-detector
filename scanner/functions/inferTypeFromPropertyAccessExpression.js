function inferTypeFromPropertyAccessExpression(parent2, usage) {
                const name = escapeLeadingUnderscores(parent2.name.text);
                if (!usage.properties) {
                    usage.properties = /* @__PURE__ */ new Map();
                }
                const propertyUsage = usage.properties.get(name) || createEmptyUsage();
                calculateUsageOfNode(parent2, propertyUsage);
                usage.properties.set(name, propertyUsage);
            }