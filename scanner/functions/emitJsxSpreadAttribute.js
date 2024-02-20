function emitJsxSpreadAttribute(node) {
                writePunctuation("{...");
                emitExpression(node.expression);
                writePunctuation("}");
            }