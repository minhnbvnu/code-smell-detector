function narrowTypeByLiteralExpression(type, literal, assumeTrue) {
                    return assumeTrue ? narrowTypeByTypeName(type, literal.text) : getAdjustedTypeWithFacts(type, typeofNEFacts.get(literal.text) || 32768 /* TypeofNEHostObject */);
                }