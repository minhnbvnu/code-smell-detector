function getOptionsSyntaxByValue(name, value) {
                const syntaxByName = getOptionsSyntaxByName(name);
                return syntaxByName && firstDefined(syntaxByName, (property) => isStringLiteral(property.initializer) && property.initializer.text === value ? property.initializer : void 0);
            }