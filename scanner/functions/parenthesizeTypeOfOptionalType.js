function parenthesizeTypeOfOptionalType(type) {
                if (hasJSDocPostfixQuestion(type))
                    return factory2.createParenthesizedType(type);
                return parenthesizeNonArrayTypeOfPostfixType(type);
            }