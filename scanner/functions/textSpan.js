function textSpan(startNode2, endNode2) {
                const lastDecorator = canHaveDecorators(startNode2) ? findLast(startNode2.modifiers, isDecorator) : void 0;
                const start = lastDecorator ? skipTrivia(sourceFile.text, lastDecorator.end) : startNode2.getStart(sourceFile);
                return createTextSpanFromBounds(start, (endNode2 || startNode2).getEnd());
            }