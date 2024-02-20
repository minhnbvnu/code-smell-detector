function getThisType(node) {
                const container = getThisContainer(node, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false);
                const parent2 = container && container.parent;
                if (parent2 && (isClassLike(parent2) || parent2.kind === 261 /* InterfaceDeclaration */)) {
                    if (!isStatic(container) && (!isConstructorDeclaration(container) || isNodeDescendantOf(node, container.body))) {
                        return getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(parent2)).thisType;
                    }
                }
                if (parent2 && isObjectLiteralExpression(parent2) && isBinaryExpression(parent2.parent) && getAssignmentDeclarationKind(parent2.parent) === 6 /* Prototype */) {
                    return getDeclaredTypeOfClassOrInterface(getSymbolOfNode(parent2.parent.left).parent).thisType;
                }
                const host2 = node.flags & 8388608 /* JSDoc */ ? getHostSignatureFromJSDoc(node) : void 0;
                if (host2 && isFunctionExpression(host2) && isBinaryExpression(host2.parent) && getAssignmentDeclarationKind(host2.parent) === 3 /* PrototypeProperty */) {
                    return getDeclaredTypeOfClassOrInterface(getSymbolOfNode(host2.parent.left).parent).thisType;
                }
                if (isJSConstructor(container) && isNodeDescendantOf(node, container.body)) {
                    return getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(container)).thisType;
                }
                error(node, Diagnostics.A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface);
                return errorType;
            }