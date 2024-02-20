function getClassElementPropertyKeyType(element) {
                const name = element.name;
                switch (name.kind) {
                    case 79 /* Identifier */:
                        return getStringLiteralType(idText(name));
                    case 8 /* NumericLiteral */:
                    case 10 /* StringLiteral */:
                        return getStringLiteralType(name.text);
                    case 164 /* ComputedPropertyName */:
                        const nameType = checkComputedPropertyName(name);
                        return isTypeAssignableToKind(nameType, 12288 /* ESSymbolLike */) ? nameType : stringType;
                    default:
                        return Debug.fail("Unsupported property name.");
                }
            }