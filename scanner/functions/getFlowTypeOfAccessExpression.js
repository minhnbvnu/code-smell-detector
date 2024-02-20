function getFlowTypeOfAccessExpression(node, prop, propType, errorNode, checkMode) {
                const assignmentKind = getAssignmentTargetKind(node);
                if (assignmentKind === 1 /* Definite */) {
                    return removeMissingType(propType, !!(prop && prop.flags & 16777216 /* Optional */));
                }
                if (prop && !(prop.flags & (3 /* Variable */ | 4 /* Property */ | 98304 /* Accessor */)) && !(prop.flags & 8192 /* Method */ && propType.flags & 1048576 /* Union */) && !isDuplicatedCommonJSExport(prop.declarations)) {
                    return propType;
                }
                if (propType === autoType) {
                    return getFlowTypeOfProperty(node, prop);
                }
                propType = getNarrowableTypeForReference(propType, node, checkMode);
                let assumeUninitialized = false;
                if (strictNullChecks && strictPropertyInitialization && isAccessExpression(node) && node.expression.kind === 108 /* ThisKeyword */) {
                    const declaration = prop && prop.valueDeclaration;
                    if (declaration && isPropertyWithoutInitializer(declaration)) {
                        if (!isStatic(declaration)) {
                            const flowContainer = getControlFlowContainer(node);
                            if (flowContainer.kind === 173 /* Constructor */ && flowContainer.parent === declaration.parent && !(declaration.flags & 16777216 /* Ambient */)) {
                                assumeUninitialized = true;
                            }
                        }
                    }
                }
                else if (strictNullChecks && prop && prop.valueDeclaration && isPropertyAccessExpression(prop.valueDeclaration) && getAssignmentDeclarationPropertyAccessKind(prop.valueDeclaration) && getControlFlowContainer(node) === getControlFlowContainer(prop.valueDeclaration)) {
                    assumeUninitialized = true;
                }
                const flowType = getFlowTypeOfReference(node, propType, assumeUninitialized ? getOptionalType(propType) : propType);
                if (assumeUninitialized && !containsUndefinedType(propType) && containsUndefinedType(flowType)) {
                    error(errorNode, Diagnostics.Property_0_is_used_before_being_assigned, symbolToString(prop));
                    return propType;
                }
                return assignmentKind ? getBaseTypeOfLiteralType(flowType) : flowType;
            }