function checkForDisallowedESSymbolOperand(operator2) {
                    const offendingSymbolOperand = maybeTypeOfKindConsideringBaseConstraint(leftType, 12288 /* ESSymbolLike */) ? left : maybeTypeOfKindConsideringBaseConstraint(rightType, 12288 /* ESSymbolLike */) ? right : void 0;
                    if (offendingSymbolOperand) {
                        error(offendingSymbolOperand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(operator2));
                        return false;
                    }
                    return true;
                }