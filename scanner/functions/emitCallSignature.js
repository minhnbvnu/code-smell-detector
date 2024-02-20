function emitCallSignature(node) {
                pushNameGenerationScope(node);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                writeTrailingSemicolon();
                popNameGenerationScope(node);
            }