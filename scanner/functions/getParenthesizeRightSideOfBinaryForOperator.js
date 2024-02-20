function getParenthesizeRightSideOfBinaryForOperator(operatorKind) {
                binaryRightOperandParenthesizerCache || (binaryRightOperandParenthesizerCache = /* @__PURE__ */ new Map());
                let parenthesizerRule = binaryRightOperandParenthesizerCache.get(operatorKind);
                if (!parenthesizerRule) {
                    parenthesizerRule = (node) => parenthesizeRightSideOfBinary(operatorKind, 
                    /*leftSide*/
                    void 0, node);
                    binaryRightOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
                }
                return parenthesizerRule;
            }