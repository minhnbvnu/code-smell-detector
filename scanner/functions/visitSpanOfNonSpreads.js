function visitSpanOfNonSpreads(chunk, multiLine, hasTrailingComma) {
                const expression = factory2.createArrayLiteralExpression(visitNodes2(factory2.createNodeArray(chunk, hasTrailingComma), visitor, isExpression), multiLine);
                return createSpreadSegment(0 /* None */, expression);
            }