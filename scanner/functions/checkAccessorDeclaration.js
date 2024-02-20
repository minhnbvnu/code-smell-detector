function checkAccessorDeclaration(node) {
                if (isIdentifier(node.name) && idText(node.name) === "constructor") {
                    error(node.name, Diagnostics.Class_constructor_may_not_be_an_accessor);
                }
                addLazyDiagnostic(checkAccessorDeclarationDiagnostics);
                checkSourceElement(node.body);
                setNodeLinksForPrivateIdentifierScope(node);
                function checkAccessorDeclarationDiagnostics() {
                    if (!checkGrammarFunctionLikeDeclaration(node) && !checkGrammarAccessor(node))
                        checkGrammarComputedPropertyName(node.name);
                    checkDecorators(node);
                    checkSignatureDeclaration(node);
                    if (node.kind === 174 /* GetAccessor */) {
                        if (!(node.flags & 16777216 /* Ambient */) && nodeIsPresent(node.body) && node.flags & 256 /* HasImplicitReturn */) {
                            if (!(node.flags & 512 /* HasExplicitReturn */)) {
                                error(node.name, Diagnostics.A_get_accessor_must_return_a_value);
                            }
                        }
                    }
                    if (node.name.kind === 164 /* ComputedPropertyName */) {
                        checkComputedPropertyName(node.name);
                    }
                    if (hasBindableName(node)) {
                        const symbol = getSymbolOfDeclaration(node);
                        const getter = getDeclarationOfKind(symbol, 174 /* GetAccessor */);
                        const setter = getDeclarationOfKind(symbol, 175 /* SetAccessor */);
                        if (getter && setter && !(getNodeCheckFlags(getter) & 1 /* TypeChecked */)) {
                            getNodeLinks(getter).flags |= 1 /* TypeChecked */;
                            const getterFlags = getEffectiveModifierFlags(getter);
                            const setterFlags = getEffectiveModifierFlags(setter);
                            if ((getterFlags & 256 /* Abstract */) !== (setterFlags & 256 /* Abstract */)) {
                                error(getter.name, Diagnostics.Accessors_must_both_be_abstract_or_non_abstract);
                                error(setter.name, Diagnostics.Accessors_must_both_be_abstract_or_non_abstract);
                            }
                            if (getterFlags & 16 /* Protected */ && !(setterFlags & (16 /* Protected */ | 8 /* Private */)) || getterFlags & 8 /* Private */ && !(setterFlags & 8 /* Private */)) {
                                error(getter.name, Diagnostics.A_get_accessor_must_be_at_least_as_accessible_as_the_setter);
                                error(setter.name, Diagnostics.A_get_accessor_must_be_at_least_as_accessible_as_the_setter);
                            }
                            const getterType = getAnnotatedAccessorType(getter);
                            const setterType = getAnnotatedAccessorType(setter);
                            if (getterType && setterType) {
                                checkTypeAssignableTo(getterType, setterType, getter, Diagnostics.The_return_type_of_a_get_accessor_must_be_assignable_to_its_set_accessor_type);
                            }
                        }
                    }
                    const returnType = getTypeOfAccessors(getSymbolOfDeclaration(node));
                    if (node.kind === 174 /* GetAccessor */) {
                        checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, returnType);
                    }
                }
            }