function visitIterationBody(body, visitor, context, nodeVisitor = visitNode) {
            context.startBlockScope();
            const updated = nodeVisitor(body, visitor, isStatement, context.factory.liftToBlock);
            Debug.assert(updated);
            const declarations = context.endBlockScope();
            if (some(declarations)) {
                if (isBlock(updated)) {
                    declarations.push(...updated.statements);
                    return context.factory.updateBlock(updated, declarations);
                }
                declarations.push(updated);
                return context.factory.createBlock(declarations);
            }
            return updated;
        }