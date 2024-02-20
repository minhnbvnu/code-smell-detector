function isExported2(node, stopAtAmbientModule = false) {
                return findAncestor(node, (node2) => {
                    if (stopAtAmbientModule && isAmbientModuleDeclaration(node2))
                        return "quit";
                    return canHaveModifiers(node2) && some(node2.modifiers, isExportModifier);
                });
            }