function emitVariableStatement(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                emit(node.declarationList);
                writeTrailingSemicolon();
            }