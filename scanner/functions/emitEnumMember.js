function emitEnumMember(node) {
                emit(node.name);
                emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }