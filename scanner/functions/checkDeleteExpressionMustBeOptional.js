function checkDeleteExpressionMustBeOptional(expr, symbol) {
                const type = getTypeOfSymbol(symbol);
                if (strictNullChecks && !(type.flags & (3 /* AnyOrUnknown */ | 131072 /* Never */)) && !(exactOptionalPropertyTypes ? symbol.flags & 16777216 /* Optional */ : getTypeFacts(type) & 16777216 /* IsUndefined */)) {
                    error(expr, Diagnostics.The_operand_of_a_delete_operator_must_be_optional);
                }
            }