function emitConstructSignature(node) {
                pushNameGenerationScope(node);
                writeKeyword("new");
                writeSpace();
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                writeTrailingSemicolon();
                popNameGenerationScope(node);
            }