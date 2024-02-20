function parenthesizeCheckTypeOfConditionalType(checkType) {
                switch (checkType.kind) {
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 191 /* ConditionalType */:
                        return factory2.createParenthesizedType(checkType);
                }
                return checkType;
            }