function visitModuleDeclaration(node) {
                if (!shouldEmitModuleDeclaration(node)) {
                    return factory2.createNotEmittedStatement(node);
                }
                Debug.assertNode(node.name, isIdentifier, "A TypeScript namespace should have an Identifier name.");
                enableSubstitutionForNamespaceExports();
                const statements = [];
                let emitFlags = 4 /* AdviseOnEmitNode */;
                const varAdded = addVarForEnumOrModuleDeclaration(statements, node);
                if (varAdded) {
                    if (moduleKind !== 4 /* System */ || currentLexicalScope !== currentSourceFile) {
                        emitFlags |= 1024 /* NoLeadingComments */;
                    }
                }
                const parameterName = getNamespaceParameterName(node);
                const containerName = getNamespaceContainerName(node);
                const exportName = hasSyntacticModifier(node, 1 /* Export */) ? factory2.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                let moduleArg = factory2.createLogicalOr(exportName, factory2.createAssignment(exportName, factory2.createObjectLiteralExpression()));
                if (hasNamespaceQualifiedExportName(node)) {
                    const localName = factory2.getLocalName(node, 
                    /*allowComments*/
                    false, 
                    /*allowSourceMaps*/
                    true);
                    moduleArg = factory2.createAssignment(localName, moduleArg);
                }
                const moduleStatement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, parameterName)], 
                /*type*/
                void 0, transformModuleBody(node, containerName)), 
                /*typeArguments*/
                void 0, [moduleArg]));
                setOriginalNode(moduleStatement, node);
                if (varAdded) {
                    setSyntheticLeadingComments(moduleStatement, void 0);
                    setSyntheticTrailingComments(moduleStatement, void 0);
                }
                setTextRange(moduleStatement, node);
                addEmitFlags(moduleStatement, emitFlags);
                statements.push(moduleStatement);
                statements.push(factory2.createEndOfDeclarationMarker(node));
                return statements;
            }