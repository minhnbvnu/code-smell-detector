function typeHasStaticProperty(propName, containingType) {
                const prop = containingType.symbol && getPropertyOfType(getTypeOfSymbol(containingType.symbol), propName);
                return prop !== void 0 && !!prop.valueDeclaration && isStatic(prop.valueDeclaration);
            }