function createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse) {
                const node = createBaseNode(224 /* ConditionalExpression */);
                node.condition = parenthesizerRules().parenthesizeConditionOfConditionalExpression(condition);
                node.questionToken = questionToken != null ? questionToken : createToken(57 /* QuestionToken */);
                node.whenTrue = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenTrue);
                node.colonToken = colonToken != null ? colonToken : createToken(58 /* ColonToken */);
                node.whenFalse = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenFalse);
                node.transformFlags |= propagateChildFlags(node.condition) | propagateChildFlags(node.questionToken) | propagateChildFlags(node.whenTrue) | propagateChildFlags(node.colonToken) | propagateChildFlags(node.whenFalse);
                return node;
            }