function emitParameter(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                true);
                emit(node.dotDotDotToken);
                emitNodeWithWriter(node.name, writeParameter);
                emit(node.questionToken);
                if (node.parent && node.parent.kind === 320 /* JSDocFunctionType */ && !node.name) {
                    emit(node.type);
                }
                else {
                    emitTypeAnnotation(node.type);
                }
                emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.pos, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }