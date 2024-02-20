function transformAsyncGeneratorFunctionBody(node) {
                resumeLexicalEnvironment();
                const statements = [];
                const statementOffset = factory2.copyPrologue(node.body.statements, statements, 
                /*ensureUseStrict*/
                false, visitor);
                appendObjectRestAssignmentsIfNeeded(statements, node);
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                capturedSuperProperties = /* @__PURE__ */ new Set();
                hasSuperElementAccess = false;
                const returnStatement = factory2.createReturnStatement(emitHelpers().createAsyncGeneratorHelper(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, factory2.createToken(41 /* AsteriskToken */), node.name && factory2.getGeneratedNameForNode(node.name), 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                [], 
                /*type*/
                void 0, factory2.updateBlock(node.body, visitLexicalEnvironment(node.body.statements, visitor, context, statementOffset))), !!(hierarchyFacts & 1 /* HasLexicalThis */)));
                const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */);
                if (emitSuperHelpers) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                    substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                    insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                }
                statements.push(returnStatement);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const block = factory2.updateBlock(node.body, statements);
                if (emitSuperHelpers && hasSuperElementAccess) {
                    if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                        addEmitHelper(block, advancedAsyncSuperHelper);
                    }
                    else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                        addEmitHelper(block, asyncSuperHelper);
                    }
                }
                capturedSuperProperties = savedCapturedSuperProperties;
                hasSuperElementAccess = savedHasSuperElementAccess;
                return block;
            }