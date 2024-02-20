function inferNamedTypesFromProperties(usage) {
                if (!usage.properties || !usage.properties.size)
                    return [];
                const types = builtins.filter((t) => allPropertiesAreAssignableToUsage(t, usage));
                if (0 < types.length && types.length < 3) {
                    return types.map((t) => inferInstantiationFromUsage(t, usage));
                }
                return [];
            }