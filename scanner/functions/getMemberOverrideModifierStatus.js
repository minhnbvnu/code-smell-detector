function getMemberOverrideModifierStatus(node, member, memberSymbol) {
                if (!member.name) {
                    return 0 /* Ok */;
                }
                const classSymbol = getSymbolOfDeclaration(node);
                const type = getDeclaredTypeOfSymbol(classSymbol);
                const typeWithThis = getTypeWithThisArgument(type);
                const staticType = getTypeOfSymbol(classSymbol);
                const baseTypeNode = getEffectiveBaseTypeNode(node);
                const baseTypes = baseTypeNode && getBaseTypes(type);
                const baseWithThis = (baseTypes == null ? void 0 : baseTypes.length) ? getTypeWithThisArgument(first(baseTypes), type.thisType) : void 0;
                const baseStaticType = getBaseConstructorTypeOfClass(type);
                const memberHasOverrideModifier = member.parent ? hasOverrideModifier(member) : hasSyntacticModifier(member, 16384 /* Override */);
                return checkMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, memberHasOverrideModifier, hasAbstractModifier(member), isStatic(member), 
                /* memberIsParameterProperty */
                false, symbolName(memberSymbol));
            }