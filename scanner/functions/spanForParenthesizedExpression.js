function spanForParenthesizedExpression(node) {
                if (positionsAreOnSameLine(node.getStart(), node.getEnd(), sourceFile))
                    return void 0;
                const textSpan = createTextSpanFromBounds(node.getStart(), node.getEnd());
                return createOutliningSpan(textSpan, "code" /* Code */, createTextSpanFromNode(node));
            }