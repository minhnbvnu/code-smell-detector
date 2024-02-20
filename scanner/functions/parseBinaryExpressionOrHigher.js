function parseBinaryExpressionOrHigher(precedence) {
                        const pos = getNodePos();
                        const leftOperand = parseUnaryExpressionOrHigher();
                        return parseBinaryExpressionRest(precedence, leftOperand, pos);
                    }