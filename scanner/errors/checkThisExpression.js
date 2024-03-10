function checkThisExpression(node) {
                const isNodeInTypeQuery = isInTypeQuery(node);
                let container = getThisContainer(node, 
                /* includeArrowFunctions */
                true, 
                /*includeClassComputedPropertyName*/
                true);
                let capturedByArrowFunction = false;
                let thisInComputedPropertyName = false;
                if (container.kind === 173 /* Constructor */) {
                    checkThisBeforeSuper(node, container, Diagnostics.super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class);
                }
                while (true) {
                    if (container.kind === 216 /* ArrowFunction */) {
                        container = getThisContainer(container, 
                        /* includeArrowFunctions */
                        false, !thisInComputedPropertyName);
                        capturedByArrowFunction = true;
                    }
                    if (container.kind === 164 /* ComputedPropertyName */) {
                        container = getThisContainer(container, !capturedByArrowFunction, 
                        /*includeClassComputedPropertyName*/
                        false);
                        thisInComputedPropertyName = true;
                        continue;
                    }
                    break;
                }
                checkThisInStaticClassFieldInitializerInDecoratedClass(node, container);
                if (thisInComputedPropertyName) {
                    error(node, Diagnostics.this_cannot_be_referenced_in_a_computed_property_name);
                }
                else {
                    switch (container.kind) {
                        case 264 /* ModuleDeclaration */:
                            error(node, Diagnostics.this_cannot_be_referenced_in_a_module_or_namespace_body);
                            break;
                        case 263 /* EnumDeclaration */:
                            error(node, Diagnostics.this_cannot_be_referenced_in_current_location);
                            break;
                        case 173 /* Constructor */:
                            if (isInConstructorArgumentInitializer(node, container)) {
                                error(node, Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                            }
                            break;
                    }
                }
                if (!isNodeInTypeQuery && capturedByArrowFunction && languageVersion < 2 /* ES2015 */) {
                    captureLexicalThis(node, container);
                }
                const type = tryGetThisTypeAt(node, 
                /*includeGlobalThis*/
                true, container);
                if (noImplicitThis) {
                    const globalThisType2 = getTypeOfSymbol(globalThisSymbol);
                    if (type === globalThisType2 && capturedByArrowFunction) {
                        error(node, Diagnostics.The_containing_arrow_function_captures_the_global_value_of_this);
                    }
                    else if (!type) {
                        const diag2 = error(node, Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation);
                        if (!isSourceFile(container)) {
                            const outsideThis = tryGetThisTypeAt(container);
                            if (outsideThis && outsideThis !== globalThisType2) {
                                addRelatedInfo(diag2, createDiagnosticForNode(container, Diagnostics.An_outer_value_of_this_is_shadowed_by_this_container));
                            }
                        }
                    }
                }
                return type || anyType;
            }