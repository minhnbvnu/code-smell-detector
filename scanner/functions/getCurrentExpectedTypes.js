function getCurrentExpectedTypes(type) {
                let currentType;
                if (type.name) {
                    currentType = type;
                }
                else if (type.expression) {
                    currentType = type.expression;
                }
                return {
                    currentType,
                    expectedTypeName: currentType && preferType[currentType.name]
                };
            }