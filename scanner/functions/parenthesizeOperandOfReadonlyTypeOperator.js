function parenthesizeOperandOfReadonlyTypeOperator(type) {
                switch (type.kind) {
                    case 195 /* TypeOperator */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeOperandOfTypeOperator(type);
            }