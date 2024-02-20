function visitExpressionOfSpread(node) {
                Debug.assertNode(node, isSpreadElement);
                let expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const isCallToReadHelper = isCallToHelper(expression, "___read");
                let kind = isCallToReadHelper || isPackedArrayLiteral(expression) ? 2 /* PackedSpread */ : 1 /* UnpackedSpread */;
                if (compilerOptions.downlevelIteration && kind === 1 /* UnpackedSpread */ && !isArrayLiteralExpression(expression) && !isCallToReadHelper) {
                    expression = emitHelpers().createReadHelper(expression, 
                    /*count*/
                    void 0);
                    kind = 2 /* PackedSpread */;
                }
                return createSpreadSegment(kind, expression);
            }