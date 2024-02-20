function emitSatisfiesExpression(node) {
                emitExpression(node.expression, 
                /*parenthesizerRules*/
                void 0);
                if (node.type) {
                    writeSpace();
                    writeKeyword("satisfies");
                    writeSpace();
                    emit(node.type);
                }
            }