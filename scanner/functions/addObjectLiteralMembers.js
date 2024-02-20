function addObjectLiteralMembers(expressions, node, receiver, start) {
                const properties = node.properties;
                const numProperties = properties.length;
                for (let i = start; i < numProperties; i++) {
                    const property = properties[i];
                    switch (property.kind) {
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const accessors = getAllAccessorDeclarations(node.properties, property);
                            if (property === accessors.firstAccessor) {
                                expressions.push(transformAccessorsToExpression(receiver, accessors, node, !!node.multiLine));
                            }
                            break;
                        case 171 /* MethodDeclaration */:
                            expressions.push(transformObjectLiteralMethodDeclarationToExpression(property, receiver, node, node.multiLine));
                            break;
                        case 299 /* PropertyAssignment */:
                            expressions.push(transformPropertyAssignmentToExpression(property, receiver, node.multiLine));
                            break;
                        case 300 /* ShorthandPropertyAssignment */:
                            expressions.push(transformShorthandPropertyAssignmentToExpression(property, receiver, node.multiLine));
                            break;
                        default:
                            Debug.failBadSyntaxKind(node);
                            break;
                    }
                }
            }