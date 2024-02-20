function collidesWithParameterName({ name }) {
                if (isIdentifier(name)) {
                    return enclosingFunctionParameterNames.has(name.escapedText);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element) && collidesWithParameterName(element)) {
                            return true;
                        }
                    }
                }
                return false;
            }