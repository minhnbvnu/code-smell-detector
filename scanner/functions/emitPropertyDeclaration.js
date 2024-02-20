function emitPropertyDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                true);
                emit(node.name);
                emit(node.questionToken);
                emit(node.exclamationToken);
                emitTypeAnnotation(node.type);
                emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name.end, node);
                writeTrailingSemicolon();
            }