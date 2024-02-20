function parenthesizeElementTypeOfTupleType(type) {
                if (hasJSDocPostfixQuestion(type))
                    return factory2.createParenthesizedType(type);
                return type;
            }