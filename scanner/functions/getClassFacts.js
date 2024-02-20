function getClassFacts(node) {
                let facts = 0 /* None */;
                const original = getOriginalNode(node);
                if (isClassDeclaration(original) && classOrConstructorParameterIsDecorated(legacyDecorators, original)) {
                    facts |= 1 /* ClassWasDecorated */;
                }
                let containsPublicInstanceFields = false;
                let containsInitializedPublicInstanceFields = false;
                let containsInstancePrivateElements = false;
                let containsInstanceAutoAccessors = false;
                for (const member of node.members) {
                    if (isStatic(member)) {
                        if (member.name && (isPrivateIdentifier(member.name) || isAutoAccessorPropertyDeclaration(member)) && shouldTransformPrivateElementsOrClassStaticBlocks) {
                            facts |= 2 /* NeedsClassConstructorReference */;
                        }
                        if (isPropertyDeclaration(member) || isClassStaticBlockDeclaration(member)) {
                            if (shouldTransformThisInStaticInitializers && member.transformFlags & 16384 /* ContainsLexicalThis */) {
                                facts |= 8 /* NeedsSubstitutionForThisInClassStaticField */;
                                if (!(facts & 1 /* ClassWasDecorated */)) {
                                    facts |= 2 /* NeedsClassConstructorReference */;
                                }
                            }
                            if (shouldTransformSuperInStaticInitializers && member.transformFlags & 134217728 /* ContainsLexicalSuper */) {
                                if (!(facts & 1 /* ClassWasDecorated */)) {
                                    facts |= 2 /* NeedsClassConstructorReference */ | 4 /* NeedsClassSuperReference */;
                                }
                            }
                        }
                    }
                    else if (!hasAbstractModifier(getOriginalNode(member))) {
                        if (isAutoAccessorPropertyDeclaration(member)) {
                            containsInstanceAutoAccessors = true;
                            containsInstancePrivateElements || (containsInstancePrivateElements = isPrivateIdentifierClassElementDeclaration(member));
                        }
                        else if (isPrivateIdentifierClassElementDeclaration(member)) {
                            containsInstancePrivateElements = true;
                        }
                        else if (isPropertyDeclaration(member)) {
                            containsPublicInstanceFields = true;
                            containsInitializedPublicInstanceFields || (containsInitializedPublicInstanceFields = !!member.initializer);
                        }
                    }
                }
                const willHoistInitializersToConstructor = shouldTransformInitializersUsingDefine && containsPublicInstanceFields || shouldTransformInitializersUsingSet && containsInitializedPublicInstanceFields || shouldTransformPrivateElementsOrClassStaticBlocks && containsInstancePrivateElements || shouldTransformPrivateElementsOrClassStaticBlocks && containsInstanceAutoAccessors && shouldTransformAutoAccessors === -1 /* True */;
                if (willHoistInitializersToConstructor) {
                    facts |= 16 /* WillHoistInitializersToConstructor */;
                }
                return facts;
            }