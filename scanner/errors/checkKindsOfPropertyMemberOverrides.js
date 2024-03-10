function checkKindsOfPropertyMemberOverrides(type, baseType) {
                var _a2, _b, _c, _d;
                const baseProperties = getPropertiesOfType(baseType);
                basePropertyCheck: for (const baseProperty of baseProperties) {
                    const base = getTargetSymbol(baseProperty);
                    if (base.flags & 4194304 /* Prototype */) {
                        continue;
                    }
                    const baseSymbol = getPropertyOfObjectType(type, base.escapedName);
                    if (!baseSymbol) {
                        continue;
                    }
                    const derived = getTargetSymbol(baseSymbol);
                    const baseDeclarationFlags = getDeclarationModifierFlagsFromSymbol(base);
                    Debug.assert(!!derived, "derived should point to something, even if it is the base class' declaration.");
                    if (derived === base) {
                        const derivedClassDecl = getClassLikeDeclarationOfSymbol(type.symbol);
                        if (baseDeclarationFlags & 256 /* Abstract */ && (!derivedClassDecl || !hasSyntacticModifier(derivedClassDecl, 256 /* Abstract */))) {
                            for (const otherBaseType of getBaseTypes(type)) {
                                if (otherBaseType === baseType)
                                    continue;
                                const baseSymbol2 = getPropertyOfObjectType(otherBaseType, base.escapedName);
                                const derivedElsewhere = baseSymbol2 && getTargetSymbol(baseSymbol2);
                                if (derivedElsewhere && derivedElsewhere !== base) {
                                    continue basePropertyCheck;
                                }
                            }
                            if (derivedClassDecl.kind === 228 /* ClassExpression */) {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1, symbolToString(baseProperty), typeToString(baseType));
                            }
                            else {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2, typeToString(type), symbolToString(baseProperty), typeToString(baseType));
                            }
                        }
                    }
                    else {
                        const derivedDeclarationFlags = getDeclarationModifierFlagsFromSymbol(derived);
                        if (baseDeclarationFlags & 8 /* Private */ || derivedDeclarationFlags & 8 /* Private */) {
                            continue;
                        }
                        let errorMessage;
                        const basePropertyFlags = base.flags & 98308 /* PropertyOrAccessor */;
                        const derivedPropertyFlags = derived.flags & 98308 /* PropertyOrAccessor */;
                        if (basePropertyFlags && derivedPropertyFlags) {
                            if ((getCheckFlags(base) & 6 /* Synthetic */ ? (_a2 = base.declarations) == null ? void 0 : _a2.some((d) => isPropertyAbstractOrInterface(d, baseDeclarationFlags)) : (_b = base.declarations) == null ? void 0 : _b.every((d) => isPropertyAbstractOrInterface(d, baseDeclarationFlags))) || getCheckFlags(base) & 262144 /* Mapped */ || derived.valueDeclaration && isBinaryExpression(derived.valueDeclaration)) {
                                continue;
                            }
                            const overriddenInstanceProperty = basePropertyFlags !== 4 /* Property */ && derivedPropertyFlags === 4 /* Property */;
                            const overriddenInstanceAccessor = basePropertyFlags === 4 /* Property */ && derivedPropertyFlags !== 4 /* Property */;
                            if (overriddenInstanceProperty || overriddenInstanceAccessor) {
                                const errorMessage2 = overriddenInstanceProperty ? Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property : Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor;
                                error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage2, symbolToString(base), typeToString(baseType), typeToString(type));
                            }
                            else if (useDefineForClassFields) {
                                const uninitialized = (_c = derived.declarations) == null ? void 0 : _c.find((d) => d.kind === 169 /* PropertyDeclaration */ && !d.initializer);
                                if (uninitialized && !(derived.flags & 33554432 /* Transient */) && !(baseDeclarationFlags & 256 /* Abstract */) && !(derivedDeclarationFlags & 256 /* Abstract */) && !((_d = derived.declarations) == null ? void 0 : _d.some((d) => !!(d.flags & 16777216 /* Ambient */)))) {
                                    const constructor = findConstructorDeclaration(getClassLikeDeclarationOfSymbol(type.symbol));
                                    const propName = uninitialized.name;
                                    if (uninitialized.exclamationToken || !constructor || !isIdentifier(propName) || !strictNullChecks || !isPropertyInitializedInConstructor(propName, type, constructor)) {
                                        const errorMessage2 = Diagnostics.Property_0_will_overwrite_the_base_property_in_1_If_this_is_intentional_add_an_initializer_Otherwise_add_a_declare_modifier_or_remove_the_redundant_declaration;
                                        error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage2, symbolToString(base), typeToString(baseType));
                                    }
                                }
                            }
                            continue;
                        }
                        else if (isPrototypeProperty(base)) {
                            if (isPrototypeProperty(derived) || derived.flags & 4 /* Property */) {
                                continue;
                            }
                            else {
                                Debug.assert(!!(derived.flags & 98304 /* Accessor */));
                                errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                            }
                        }
                        else if (base.flags & 98304 /* Accessor */) {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                        }
                        else {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                        }
                        error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                    }
                }
            }