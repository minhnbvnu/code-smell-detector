function isKeyValueProperty(property) {
                return !((property.method ||
                    property.shorthand ||
                    property.kind !== "init" || property.type !== "Property") // Could be "ExperimentalSpreadProperty" or "SpreadElement"
                );
            }