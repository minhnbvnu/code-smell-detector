function emitExternalModuleReference(node) {
                writeKeyword("require");
                writePunctuation("(");
                emitExpression(node.expression);
                writePunctuation(")");
            }