function checkSuperExpression(node) {
                const isCallExpression2 = node.parent.kind === 210 /* CallExpression */ && node.parent.expression === node;
                const immediateContainer = getSuperContainer(node, 
                /*stopOnFunctions*/
                true);
                let container = immediateContainer;
                let needToCaptureLexicalThis = false;
                let inAsyncFunction = false;
                if (!isCallExpression2) {
                    while (container && container.kind === 216 /* ArrowFunction */) {
                        if (hasSyntacticModifier(container, 512 /* Async */))
                            inAsyncFunction = true;
                        container = getSuperContainer(container, 
                        /*stopOnFunctions*/
                        true);
                        needToCaptureLexicalThis = languageVersion < 2 /* ES2015 */;
                    }
                    if (container && hasSyntacticModifier(container, 512 /* Async */))
                        inAsyncFunction = true;
                }
                let nodeCheckFlag = 0;
                if (!container || !isLegalUsageOfSuperExpression(container)) {
                    const current = findAncestor(node, (n) => n === container ? "quit" : n.kind === 164 /* ComputedPropertyName */);
                    if (current && current.kind === 164 /* ComputedPropertyName */) {
                        error(node, Diagnostics.super_cannot_be_referenced_in_a_computed_property_name);
                    }
                    else if (isCallExpression2) {
                        error(node, Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
                    }
                    else if (!container || !container.parent || !(isClassLike(container.parent) || container.parent.kind === 207 /* ObjectLiteralExpression */)) {
                        error(node, Diagnostics.super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions);
                    }
                    else {
                        error(node, Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
                    }
                    return errorType;
                }
                if (!isCallExpression2 && immediateContainer.kind === 173 /* Constructor */) {
                    checkThisBeforeSuper(node, container, Diagnostics.super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class);
                }
                if (isStatic(container) || isCallExpression2) {
                    nodeCheckFlag = 32 /* SuperStatic */;
                    if (!isCallExpression2 && languageVersion >= 2 /* ES2015 */ && languageVersion <= 8 /* ES2021 */ && (isPropertyDeclaration(container) || isClassStaticBlockDeclaration(container))) {
                        forEachEnclosingBlockScopeContainer(node.parent, (current) => {
                            if (!isSourceFile(current) || isExternalOrCommonJsModule(current)) {
                                getNodeLinks(current).flags |= 8388608 /* ContainsSuperPropertyInStaticInitializer */;
                            }
                        });
                    }
                }
                else {
                    nodeCheckFlag = 16 /* SuperInstance */;
                }
                getNodeLinks(node).flags |= nodeCheckFlag;
                if (container.kind === 171 /* MethodDeclaration */ && inAsyncFunction) {
                    if (isSuperProperty(node.parent) && isAssignmentTarget(node.parent)) {
                        getNodeLinks(container).flags |= 256 /* MethodWithSuperPropertyAssignmentInAsync */;
                    }
                    else {
                        getNodeLinks(container).flags |= 128 /* MethodWithSuperPropertyAccessInAsync */;
                    }
                }
                if (needToCaptureLexicalThis) {
                    captureLexicalThis(node.parent, container);
                }
                if (container.parent.kind === 207 /* ObjectLiteralExpression */) {
                    if (languageVersion < 2 /* ES2015 */) {
                        error(node, Diagnostics.super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher);
                        return errorType;
                    }
                    else {
                        return anyType;
                    }
                }
                const classLikeDeclaration = container.parent;
                if (!getClassExtendsHeritageElement(classLikeDeclaration)) {
                    error(node, Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                    return errorType;
                }
                const classType = getDeclaredTypeOfSymbol(getSymbolOfDeclaration(classLikeDeclaration));
                const baseClassType = classType && getBaseTypes(classType)[0];
                if (!baseClassType) {
                    return errorType;
                }
                if (container.kind === 173 /* Constructor */ && isInConstructorArgumentInitializer(node, container)) {
                    error(node, Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                    return errorType;
                }
                return nodeCheckFlag === 32 /* SuperStatic */ ? getBaseConstructorTypeOfClass(classType) : getTypeWithThisArgument(baseClassType, classType.thisType);
                function isLegalUsageOfSuperExpression(container2) {
                    if (isCallExpression2) {
                        return container2.kind === 173 /* Constructor */;
                    }
                    else {
                        if (isClassLike(container2.parent) || container2.parent.kind === 207 /* ObjectLiteralExpression */) {
                            if (isStatic(container2)) {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 172 /* ClassStaticBlockDeclaration */;
                            }
                            else {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 168 /* PropertySignature */ || container2.kind === 173 /* Constructor */;
                            }
                        }
                    }
                    return false;
                }
            }