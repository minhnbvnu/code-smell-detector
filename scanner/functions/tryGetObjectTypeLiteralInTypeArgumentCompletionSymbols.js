function tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols() {
                const typeLiteralNode = tryGetTypeLiteralNode(contextToken);
                if (!typeLiteralNode)
                    return 0 /* Continue */;
                const intersectionTypeNode = isIntersectionTypeNode(typeLiteralNode.parent) ? typeLiteralNode.parent : void 0;
                const containerTypeNode = intersectionTypeNode || typeLiteralNode;
                const containerExpectedType = getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker);
                if (!containerExpectedType)
                    return 0 /* Continue */;
                const containerActualType = typeChecker.getTypeFromTypeNode(containerTypeNode);
                const members = getPropertiesForCompletion(containerExpectedType, typeChecker);
                const existingMembers = getPropertiesForCompletion(containerActualType, typeChecker);
                const existingMemberEscapedNames = /* @__PURE__ */ new Set();
                existingMembers.forEach((s) => existingMemberEscapedNames.add(s.escapedName));
                symbols = concatenate(symbols, filter(members, (s) => !existingMemberEscapedNames.has(s.escapedName)));
                completionKind = 0 /* ObjectPropertyDeclaration */;
                isNewIdentifierLocation = true;
                return 1 /* Success */;
            }