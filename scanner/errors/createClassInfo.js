function createClassInfo(node) {
                let instanceExtraInitializersName;
                let staticExtraInitializersName;
                let hasStaticInitializers = false;
                let hasNonAmbientInstanceFields = false;
                let hasStaticPrivateClassElements = false;
                for (const member of node.members) {
                    if (isNamedClassElement(member) && nodeOrChildIsDecorated(
                    /*legacyDecorators*/
                    false, member, node)) {
                        if (hasStaticModifier(member)) {
                            staticExtraInitializersName != null ? staticExtraInitializersName : staticExtraInitializersName = factory2.createUniqueName("_staticExtraInitializers", 16 /* Optimistic */);
                        }
                        else {
                            instanceExtraInitializersName != null ? instanceExtraInitializersName : instanceExtraInitializersName = factory2.createUniqueName("_instanceExtraInitializers", 16 /* Optimistic */);
                        }
                    }
                    if (isClassStaticBlockDeclaration(member)) {
                        hasStaticInitializers = true;
                    }
                    else if (isPropertyDeclaration(member)) {
                        if (hasStaticModifier(member)) {
                            hasStaticInitializers || (hasStaticInitializers = !!member.initializer || hasDecorators(member));
                        }
                        else {
                            hasNonAmbientInstanceFields || (hasNonAmbientInstanceFields = !isAmbientPropertyDeclaration(member));
                        }
                    }
                    if ((isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member)) {
                        hasStaticPrivateClassElements = true;
                    }
                    if (staticExtraInitializersName && instanceExtraInitializersName && hasStaticInitializers && hasNonAmbientInstanceFields && hasStaticPrivateClassElements) {
                        break;
                    }
                }
                return {
                    class: node,
                    instanceExtraInitializersName,
                    staticExtraInitializersName,
                    hasStaticInitializers,
                    hasNonAmbientInstanceFields,
                    hasStaticPrivateClassElements
                };
            }