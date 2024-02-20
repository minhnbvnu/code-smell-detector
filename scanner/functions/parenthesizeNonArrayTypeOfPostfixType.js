function parenthesizeNonArrayTypeOfPostfixType(type) {
                switch (type.kind) {
                    case 192 /* InferType */:
                    case 195 /* TypeOperator */:
                    case 183 /* TypeQuery */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeOperandOfTypeOperator(type);
            }