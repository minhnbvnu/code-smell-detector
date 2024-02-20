function emitAsExpression(node) {
                emitExpression(node.expression, 
                /*parenthesizerRules*/
                void 0);
                if (node.type) {
                    writeSpace();
                    writeKeyword("as");
                    writeSpace();
                    emit(node.type);
                }
            }