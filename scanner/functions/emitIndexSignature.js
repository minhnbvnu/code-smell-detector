function emitIndexSignature(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                emitParametersForIndexSignature(node, node.parameters);
                emitTypeAnnotation(node.type);
                writeTrailingSemicolon();
            }