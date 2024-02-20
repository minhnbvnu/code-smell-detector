function transformMethodBody(node) {
                Debug.assertIsDefined(node.body);
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                capturedSuperProperties = /* @__PURE__ */ new Set();
                hasSuperElementAccess = false;
                let updated = visitFunctionBody(node.body, visitor, context);
                const originalMethod = getOriginalNode(node, isFunctionLikeDeclaration);
                const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */) && (getFunctionFlags(originalMethod) & 3 /* AsyncGenerator */) !== 3 /* AsyncGenerator */;
                if (emitSuperHelpers) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    if (capturedSuperProperties.size) {
                        const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                        substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                        const statements = updated.statements.slice();
                        insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                        updated = factory2.updateBlock(updated, statements);
                    }
                    if (hasSuperElementAccess) {
                        if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                            addEmitHelper(updated, advancedAsyncSuperHelper);
                        }
                        else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                            addEmitHelper(updated, asyncSuperHelper);
                        }
                    }
                }
                capturedSuperProperties = savedCapturedSuperProperties;
                hasSuperElementAccess = savedHasSuperElementAccess;
                return updated;
            }