function getMappedBindingNameOrDefault(bindingName) {
                if (isIdentifier(bindingName))
                    return getMapEntryOrDefault(bindingName);
                const elements = flatMap(bindingName.elements, (element) => {
                    if (isOmittedExpression(element))
                        return [];
                    return [getMappedBindingNameOrDefault(element.name)];
                });
                return createSynthBindingPattern(bindingName, elements);
            }