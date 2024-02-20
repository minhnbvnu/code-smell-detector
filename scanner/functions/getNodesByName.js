function getNodesByName(name) {
                const propertyNodesByName = propertyNodesByNameStack[propertyNodesByNameStack.length - 1];
                const existing = propertyNodesByName.get(name);
                if (existing) {
                    return existing;
                }
                const created = {};
                propertyNodesByName.set(name, created);
                return created;
            }