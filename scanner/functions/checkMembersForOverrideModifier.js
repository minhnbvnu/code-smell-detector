function checkMembersForOverrideModifier(node, type, typeWithThis, staticType) {
                const baseTypeNode = getEffectiveBaseTypeNode(node);
                const baseTypes = baseTypeNode && getBaseTypes(type);
                const baseWithThis = (baseTypes == null ? void 0 : baseTypes.length) ? getTypeWithThisArgument(first(baseTypes), type.thisType) : void 0;
                const baseStaticType = getBaseConstructorTypeOfClass(type);
                for (const member of node.members) {
                    if (hasAmbientModifier(member)) {
                        continue;
                    }
                    if (isConstructorDeclaration(member)) {
                        forEach(member.parameters, (param) => {
                            if (isParameterPropertyDeclaration(param, member)) {
                                checkExistingMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, param, 
                                /* memberIsParameterProperty */
                                true);
                            }
                        });
                    }
                    checkExistingMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, member, 
                    /* memberIsParameterProperty */
                    false);
                }
            }