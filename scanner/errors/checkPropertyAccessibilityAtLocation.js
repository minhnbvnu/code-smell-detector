function checkPropertyAccessibilityAtLocation(location, isSuper, writing, containingType, prop, errorNode) {
                const flags = getDeclarationModifierFlagsFromSymbol(prop, writing);
                if (isSuper) {
                    if (languageVersion < 2 /* ES2015 */) {
                        if (symbolHasNonMethodDeclaration(prop)) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                            }
                            return false;
                        }
                    }
                    if (flags & 256 /* Abstract */) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression, symbolToString(prop), typeToString(getDeclaringClass(prop)));
                        }
                        return false;
                    }
                }
                if (flags & 256 /* Abstract */ && symbolHasNonMethodDeclaration(prop) && (isThisProperty(location) || isThisInitializedObjectBindingExpression(location) || isObjectBindingPattern(location.parent) && isThisInitializedDeclaration(location.parent.parent))) {
                    const declaringClassDeclaration = getClassLikeDeclarationOfSymbol(getParentOfSymbol(prop));
                    if (declaringClassDeclaration && isNodeUsedDuringClassInitialization(location)) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor, symbolToString(prop), getTextOfIdentifierOrLiteral(declaringClassDeclaration.name));
                        }
                        return false;
                    }
                }
                if (!(flags & 24 /* NonPublicAccessibilityModifier */)) {
                    return true;
                }
                if (flags & 8 /* Private */) {
                    const declaringClassDeclaration = getClassLikeDeclarationOfSymbol(getParentOfSymbol(prop));
                    if (!isNodeWithinClass(location, declaringClassDeclaration)) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(getDeclaringClass(prop)));
                        }
                        return false;
                    }
                    return true;
                }
                if (isSuper) {
                    return true;
                }
                let enclosingClass = forEachEnclosingClass(location, (enclosingDeclaration) => {
                    const enclosingClass2 = getDeclaredTypeOfSymbol(getSymbolOfDeclaration(enclosingDeclaration));
                    return isClassDerivedFromDeclaringClasses(enclosingClass2, prop, writing);
                });
                if (!enclosingClass) {
                    enclosingClass = getEnclosingClassFromThisParameter(location);
                    enclosingClass = enclosingClass && isClassDerivedFromDeclaringClasses(enclosingClass, prop, writing);
                    if (flags & 32 /* Static */ || !enclosingClass) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(getDeclaringClass(prop) || containingType));
                        }
                        return false;
                    }
                }
                if (flags & 32 /* Static */) {
                    return true;
                }
                if (containingType.flags & 262144 /* TypeParameter */) {
                    containingType = containingType.isThisType ? getConstraintOfTypeParameter(containingType) : getBaseConstraintOfType(containingType);
                }
                if (!containingType || !hasBaseType(containingType, enclosingClass)) {
                    if (errorNode) {
                        error(errorNode, Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_This_is_an_instance_of_class_2, symbolToString(prop), typeToString(enclosingClass), typeToString(containingType));
                    }
                    return false;
                }
                return true;
            }