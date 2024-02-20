function getParenthesizeLeftSideOfBinaryForOperator(operatorKind) {
                binaryLeftOperandParenthesizerCache || (binaryLeftOperandParenthesizerCache = /* @__PURE__ */ new Map());
                let parenthesizerRule = binaryLeftOperandParenthesizerCache.get(operatorKind);
                if (!parenthesizerRule) {
                    parenthesizerRule = (node) => parenthesizeLeftSideOfBinary(operatorKind, node);
                    binaryLeftOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
                }
                return parenthesizerRule;
            }