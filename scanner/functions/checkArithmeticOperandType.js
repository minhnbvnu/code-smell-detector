function checkArithmeticOperandType(operand, type, diagnostic, isAwaitValid = false) {
                if (!isTypeAssignableTo(type, numberOrBigIntType)) {
                    const awaitedType = isAwaitValid && getAwaitedTypeOfPromise(type);
                    errorAndMaybeSuggestAwait(operand, !!awaitedType && isTypeAssignableTo(awaitedType, numberOrBigIntType), diagnostic);
                    return false;
                }
                return true;
            }