function emitShorthandPropertyAssignment(node) {
                emit(node.name);
                if (node.objectAssignmentInitializer) {
                    writeSpace();
                    writePunctuation("=");
                    writeSpace();
                    emitExpression(node.objectAssignmentInitializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
                }
            }