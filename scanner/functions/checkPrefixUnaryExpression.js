function checkPrefixUnaryExpression(node) {
                const operandType = checkExpression(node.operand);
                if (operandType === silentNeverType) {
                    return silentNeverType;
                }
                switch (node.operand.kind) {
                    case 8 /* NumericLiteral */:
                        switch (node.operator) {
                            case 40 /* MinusToken */:
                                return getFreshTypeOfLiteralType(getNumberLiteralType(-node.operand.text));
                            case 39 /* PlusToken */:
                                return getFreshTypeOfLiteralType(getNumberLiteralType(+node.operand.text));
                        }
                        break;
                    case 9 /* BigIntLiteral */:
                        if (node.operator === 40 /* MinusToken */) {
                            return getFreshTypeOfLiteralType(getBigIntLiteralType({
                                negative: true,
                                base10Value: parsePseudoBigInt(node.operand.text)
                            }));
                        }
                }
                switch (node.operator) {
                    case 39 /* PlusToken */:
                    case 40 /* MinusToken */:
                    case 54 /* TildeToken */:
                        checkNonNullType(operandType, node.operand);
                        if (maybeTypeOfKindConsideringBaseConstraint(operandType, 12288 /* ESSymbolLike */)) {
                            error(node.operand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(node.operator));
                        }
                        if (node.operator === 39 /* PlusToken */) {
                            if (maybeTypeOfKindConsideringBaseConstraint(operandType, 2112 /* BigIntLike */)) {
                                error(node.operand, Diagnostics.Operator_0_cannot_be_applied_to_type_1, tokenToString(node.operator), typeToString(getBaseTypeOfLiteralType(operandType)));
                            }
                            return numberType;
                        }
                        return getUnaryResultType(operandType);
                    case 53 /* ExclamationToken */:
                        checkTruthinessExpression(node.operand);
                        const facts = getTypeFacts(operandType) & (4194304 /* Truthy */ | 8388608 /* Falsy */);
                        return facts === 4194304 /* Truthy */ ? falseType : facts === 8388608 /* Falsy */ ? trueType : booleanType;
                    case 45 /* PlusPlusToken */:
                    case 46 /* MinusMinusToken */:
                        const ok = checkArithmeticOperandType(node.operand, checkNonNullType(operandType, node.operand), Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type);
                        if (ok) {
                            checkReferenceExpression(node.operand, Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access, Diagnostics.The_operand_of_an_increment_or_decrement_operator_may_not_be_an_optional_property_access);
                        }
                        return getUnaryResultType(operandType);
                }
                return errorType;
            }