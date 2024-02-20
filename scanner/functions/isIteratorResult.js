function isIteratorResult(type, kind) {
                const doneType = getTypeOfPropertyOfType(type, "done") || falseType;
                return isTypeAssignableTo(kind === 0 /* Yield */ ? falseType : trueType, doneType);
            }