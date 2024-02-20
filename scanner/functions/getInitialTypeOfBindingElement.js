function getInitialTypeOfBindingElement(node) {
                const pattern = node.parent;
                const parentType = getInitialType(pattern.parent);
                const type = pattern.kind === 203 /* ObjectBindingPattern */ ? getTypeOfDestructuredProperty(parentType, node.propertyName || node.name) : !node.dotDotDotToken ? getTypeOfDestructuredArrayElement(parentType, pattern.elements.indexOf(node)) : getTypeOfDestructuredSpreadExpression(parentType);
                return getTypeWithDefault(type, node.initializer);
            }