function isExtendedByInterface(node) {
                const grandparent = node.parent.parent;
                const parentOfGrandparent = grandparent.parent;
                if (grandparent && parentOfGrandparent) {
                    const isExtending = isHeritageClause(grandparent) && grandparent.token === 94 /* ExtendsKeyword */;
                    const isInterface = isInterfaceDeclaration(parentOfGrandparent);
                    return isExtending && isInterface;
                }
                return false;
            }