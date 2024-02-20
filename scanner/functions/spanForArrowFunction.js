function spanForArrowFunction(node) {
                if (isBlock(node.body) || isParenthesizedExpression(node.body) || positionsAreOnSameLine(node.body.getFullStart(), node.body.getEnd(), sourceFile)) {
                    return void 0;
                }
                const textSpan = createTextSpanFromBounds(node.body.getFullStart(), node.body.getEnd());
                return createOutliningSpan(textSpan, "code" /* Code */, createTextSpanFromNode(node));
            }