function getEffectiveDeclarationFlags(n, flagsToCheck) {
                let flags = getCombinedModifierFlags(n);
                if (n.parent.kind !== 261 /* InterfaceDeclaration */ && n.parent.kind !== 260 /* ClassDeclaration */ && n.parent.kind !== 228 /* ClassExpression */ && n.flags & 16777216 /* Ambient */) {
                    if (!(flags & 2 /* Ambient */) && !(isModuleBlock(n.parent) && isModuleDeclaration(n.parent.parent) && isGlobalScopeAugmentation(n.parent.parent))) {
                        flags |= 1 /* Export */;
                    }
                    flags |= 2 /* Ambient */;
                }
                return flags & flagsToCheck;
            }