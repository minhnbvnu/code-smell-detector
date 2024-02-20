function canHaveShorthand(property) {
                return (property.kind !== "set" && property.kind !== "get" && property.type !== "SpreadElement" && property.type !== "SpreadProperty" && property.type !== "ExperimentalSpreadProperty");
            }