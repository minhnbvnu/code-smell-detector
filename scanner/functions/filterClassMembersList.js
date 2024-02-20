function filterClassMembersList(baseSymbols, existingMembers, currentClassElementModifierFlags) {
                const existingMemberNames = /* @__PURE__ */ new Set();
                for (const m of existingMembers) {
                    if (m.kind !== 169 /* PropertyDeclaration */ && m.kind !== 171 /* MethodDeclaration */ && m.kind !== 174 /* GetAccessor */ && m.kind !== 175 /* SetAccessor */) {
                        continue;
                    }
                    if (isCurrentlyEditingNode(m)) {
                        continue;
                    }
                    if (hasEffectiveModifier(m, 8 /* Private */)) {
                        continue;
                    }
                    if (isStatic(m) !== !!(currentClassElementModifierFlags & 32 /* Static */)) {
                        continue;
                    }
                    const existingName = getPropertyNameForPropertyNameNode(m.name);
                    if (existingName) {
                        existingMemberNames.add(existingName);
                    }
                }
                return baseSymbols.filter((propertySymbol) => !existingMemberNames.has(propertySymbol.escapedName) && !!propertySymbol.declarations && !(getDeclarationModifierFlagsFromSymbol(propertySymbol) & 8 /* Private */) && !(propertySymbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(propertySymbol.valueDeclaration)));
            }