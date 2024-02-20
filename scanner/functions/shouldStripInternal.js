function shouldStripInternal(node) {
                return !!stripInternal && !!node && isInternalDeclaration(node, currentSourceFile);
            }