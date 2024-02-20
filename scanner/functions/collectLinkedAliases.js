function collectLinkedAliases(node) {
                if (isExportAssignment(node)) {
                    if (node.expression.kind === 79 /* Identifier */) {
                        resolver.collectLinkedAliases(node.expression, 
                        /*setVisibility*/
                        true);
                    }
                    return;
                }
                else if (isExportSpecifier(node)) {
                    resolver.collectLinkedAliases(node.propertyName || node.name, 
                    /*setVisibility*/
                    true);
                    return;
                }
                forEachChild(node, collectLinkedAliases);
            }