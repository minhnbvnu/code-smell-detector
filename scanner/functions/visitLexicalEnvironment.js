function visitLexicalEnvironment(statements, visitor, context, start, ensureUseStrict, nodesVisitor = visitNodes2) {
            context.startLexicalEnvironment();
            statements = nodesVisitor(statements, visitor, isStatement, start);
            if (ensureUseStrict)
                statements = context.factory.ensureUseStrict(statements);
            return factory.mergeLexicalEnvironment(statements, context.endLexicalEnvironment());
        }