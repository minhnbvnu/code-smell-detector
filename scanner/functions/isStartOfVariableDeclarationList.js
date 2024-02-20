function isStartOfVariableDeclarationList(context) {
            return context.currentTokenParent.kind === 258 /* VariableDeclarationList */ && context.currentTokenParent.getStart(context.sourceFile) === context.currentTokenSpan.pos;
        }