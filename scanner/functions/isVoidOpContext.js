function isVoidOpContext(context) {
            return context.currentTokenSpan.kind === 114 /* VoidKeyword */ && context.currentTokenParent.kind === 219 /* VoidExpression */;
        }