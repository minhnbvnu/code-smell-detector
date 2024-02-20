function getLiteralTypeFromPropertyName(name) {
                if (isPrivateIdentifier(name)) {
                    return neverType;
                }
                return isIdentifier(name) ? getStringLiteralType(unescapeLeadingUnderscores(name.escapedText)) : getRegularTypeOfLiteralType(isComputedPropertyName(name) ? checkComputedPropertyName(name) : checkExpression(name));
            }