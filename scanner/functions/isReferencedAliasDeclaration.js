function isReferencedAliasDeclaration(node, checkChildren) {
                Debug.assert(!compilerOptions.verbatimModuleSyntax);
                if (isAliasSymbolDeclaration2(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    const links = symbol && getSymbolLinks(symbol);
                    if (links == null ? void 0 : links.referenced) {
                        return true;
                    }
                    const target = getSymbolLinks(symbol).aliasTarget;
                    if (target && getEffectiveModifierFlags(node) & 1 /* Export */ && getAllSymbolFlags(target) & 111551 /* Value */ && (shouldPreserveConstEnums(compilerOptions) || !isConstEnumOrConstEnumOnlyModule(target))) {
                        return true;
                    }
                }
                if (checkChildren) {
                    return !!forEachChild(node, (node2) => isReferencedAliasDeclaration(node2, checkChildren));
                }
                return false;
            }