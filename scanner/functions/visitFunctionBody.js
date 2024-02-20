function visitFunctionBody(node, visitor, context, nodeVisitor = visitNode) {
            context.resumeLexicalEnvironment();
            const updated = nodeVisitor(node, visitor, isConciseBody);
            const declarations = context.endLexicalEnvironment();
            if (some(declarations)) {
                if (!updated) {
                    return context.factory.createBlock(declarations);
                }
                const block = context.factory.converters.convertToFunctionBlock(updated);
                const statements = factory.mergeLexicalEnvironment(block.statements, declarations);
                return context.factory.updateBlock(block, statements);
            }
            return updated;
        }