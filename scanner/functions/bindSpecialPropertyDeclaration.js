function bindSpecialPropertyDeclaration(node) {
                if (node.expression.kind === 108 /* ThisKeyword */) {
                    bindThisPropertyAssignment(node);
                }
                else if (isBindableStaticAccessExpression(node) && node.parent.parent.kind === 308 /* SourceFile */) {
                    if (isPrototypeAccess(node.expression)) {
                        bindPrototypePropertyAssignment(node, node.parent);
                    }
                    else {
                        bindStaticPropertyAssignment(node);
                    }
                }
            }