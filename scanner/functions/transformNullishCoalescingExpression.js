function transformNullishCoalescingExpression(node) {
                let left = visitNode(node.left, visitor, isExpression);
                let right = left;
                if (!isSimpleCopiableExpression(left)) {
                    right = factory2.createTempVariable(hoistVariableDeclaration);
                    left = factory2.createAssignment(right, left);
                }
                return setTextRange(factory2.createConditionalExpression(createNotNullCondition(left, right), 
                /*questionToken*/
                void 0, right, 
                /*colonToken*/
                void 0, visitNode(node.right, visitor, isExpression)), node);
            }