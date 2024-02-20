function filterBindingName(name, keep) {
            switch (name.kind) {
                case 79 /* Identifier */:
                    return keep(name) ? name : void 0;
                case 204 /* ArrayBindingPattern */:
                    return name;
                case 203 /* ObjectBindingPattern */: {
                    const newElements = name.elements.filter((prop) => prop.propertyName || !isIdentifier(prop.name) || keep(prop.name));
                    return newElements.length ? factory.createObjectBindingPattern(newElements) : void 0;
                }
            }
        }