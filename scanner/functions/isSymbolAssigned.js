function isSymbolAssigned(symbol) {
                if (!symbol.valueDeclaration) {
                    return false;
                }
                const parent2 = getRootDeclaration(symbol.valueDeclaration).parent;
                const links = getNodeLinks(parent2);
                if (!(links.flags & 524288 /* AssignmentsMarked */)) {
                    links.flags |= 524288 /* AssignmentsMarked */;
                    if (!hasParentWithAssignmentsMarked(parent2)) {
                        markNodeAssignments(parent2);
                    }
                }
                return symbol.isAssigned || false;
            }