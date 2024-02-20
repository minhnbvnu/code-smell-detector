function checkPropertyInitialization(node) {
                if (!strictNullChecks || !strictPropertyInitialization || node.flags & 16777216 /* Ambient */) {
                    return;
                }
                const constructor = findConstructorDeclaration(node);
                for (const member of node.members) {
                    if (getEffectiveModifierFlags(member) & 2 /* Ambient */) {
                        continue;
                    }
                    if (!isStatic(member) && isPropertyWithoutInitializer(member)) {
                        const propName = member.name;
                        if (isIdentifier(propName) || isPrivateIdentifier(propName) || isComputedPropertyName(propName)) {
                            const type = getTypeOfSymbol(getSymbolOfDeclaration(member));
                            if (!(type.flags & 3 /* AnyOrUnknown */ || containsUndefinedType(type))) {
                                if (!constructor || !isPropertyInitializedInConstructor(propName, type, constructor)) {
                                    error(member.name, Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor, declarationNameToString(propName));
                                }
                            }
                        }
                    }
                }
            }