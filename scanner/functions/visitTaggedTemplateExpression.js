function visitTaggedTemplateExpression(node) {
                return processTaggedTemplateExpression(context, node, visitor, currentSourceFile, recordTaggedTemplateString, 1 /* All */);
            }