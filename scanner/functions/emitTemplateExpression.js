function emitTemplateExpression(node) {
                emit(node.head);
                emitList(node, node.templateSpans, 262144 /* TemplateExpressionSpans */);
            }