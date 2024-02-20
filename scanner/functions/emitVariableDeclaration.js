function emitVariableDeclaration(node) {
                var _a2, _b, _c, _d, _e;
                emit(node.name);
                emit(node.exclamationToken);
                emitTypeAnnotation(node.type);
                emitInitializer(node.initializer, (_e = (_d = (_a2 = node.type) == null ? void 0 : _a2.end) != null ? _d : (_c = (_b = node.name.emitNode) == null ? void 0 : _b.typeNode) == null ? void 0 : _c.end) != null ? _e : node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }