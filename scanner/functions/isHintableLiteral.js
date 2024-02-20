function isHintableLiteral(node) {
                switch (node.kind) {
                    case 221 /* PrefixUnaryExpression */: {
                        const operand = node.operand;
                        return isLiteralExpression(operand) || isIdentifier(operand) && isInfinityOrNaNString(operand.escapedText);
                    }
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 104 /* NullKeyword */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 225 /* TemplateExpression */:
                        return true;
                    case 79 /* Identifier */: {
                        const name = node.escapedText;
                        return isUndefined(name) || isInfinityOrNaNString(name);
                    }
                }
                return isLiteralExpression(node);
            }