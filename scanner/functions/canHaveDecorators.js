function canHaveDecorators(node) {
            const kind = node.kind;
            return kind === 166 /* Parameter */ || kind === 169 /* PropertyDeclaration */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */ || kind === 228 /* ClassExpression */ || kind === 260 /* ClassDeclaration */;
        }