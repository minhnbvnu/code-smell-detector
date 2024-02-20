function checkDeleteExpression(node) {
                checkExpression(node.expression);
                const expr = skipParentheses(node.expression);
                if (!isAccessExpression(expr)) {
                    error(expr, Diagnostics.The_operand_of_a_delete_operator_must_be_a_property_reference);
                    return booleanType;
                }
                if (isPropertyAccessExpression(expr) && isPrivateIdentifier(expr.name)) {
                    error(expr, Diagnostics.The_operand_of_a_delete_operator_cannot_be_a_private_identifier);
                }
                const links = getNodeLinks(expr);
                const symbol = getExportSymbolOfValueSymbolIfExported(links.resolvedSymbol);
                if (symbol) {
                    if (isReadonlySymbol(symbol)) {
                        error(expr, Diagnostics.The_operand_of_a_delete_operator_cannot_be_a_read_only_property);
                    }
                    checkDeleteExpressionMustBeOptional(expr, symbol);
                }
                return booleanType;
            }