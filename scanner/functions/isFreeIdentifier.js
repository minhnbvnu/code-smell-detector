function isFreeIdentifier(node) {
            const { parent: parent2 } = node;
            switch (parent2.kind) {
                case 208 /* PropertyAccessExpression */:
                    return parent2.name !== node;
                case 205 /* BindingElement */:
                    return parent2.propertyName !== node;
                case 273 /* ImportSpecifier */:
                    return parent2.propertyName !== node;
                default:
                    return true;
            }
        }