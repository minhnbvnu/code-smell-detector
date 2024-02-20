function isBlockOrCatchScoped(declaration) {
            return (getCombinedNodeFlags(declaration) & 3 /* BlockScoped */) !== 0 || isCatchClauseVariableDeclarationOrBindingElement(declaration);
        }