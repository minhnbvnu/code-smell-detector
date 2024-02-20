function updatePaths(property) {
                const elements = isArrayLiteralExpression(property.initializer) ? property.initializer.elements : [property.initializer];
                let foundExactMatch = false;
                for (const element of elements) {
                    foundExactMatch = tryUpdateString(element) || foundExactMatch;
                }
                return foundExactMatch;
            }