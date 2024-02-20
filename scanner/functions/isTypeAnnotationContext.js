function isTypeAnnotationContext(context) {
            const contextKind = context.contextNode.kind;
            return contextKind === 169 /* PropertyDeclaration */ || contextKind === 168 /* PropertySignature */ || contextKind === 166 /* Parameter */ || contextKind === 257 /* VariableDeclaration */ || isFunctionLikeKind(contextKind);
        }