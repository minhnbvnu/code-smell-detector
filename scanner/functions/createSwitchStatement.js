function createSwitchStatement(expression, caseBlock) {
                const node = createBaseNode(252 /* SwitchStatement */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.caseBlock = caseBlock;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.caseBlock);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                node.possiblyExhaustive = false;
                return node;
            }