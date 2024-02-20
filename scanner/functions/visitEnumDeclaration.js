function visitEnumDeclaration(node) {
                if (!shouldEmitEnumDeclaration(node)) {
                    return factory2.createNotEmittedStatement(node);
                }
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
                const enumStatement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createFunctionExpression(
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
                void 0, transformEnumBody(node, containerName)), 
                /*typeArguments*/
                void 0, [moduleArg]));
                setOriginalNode(enumStatement, node);
                if (varAdded) {
                    setSyntheticLeadingComments(enumStatement, void 0);
                    setSyntheticTrailingComments(enumStatement, void 0);
                }
                setTextRange(enumStatement, node);
                addEmitFlags(enumStatement, emitFlags);
                statements.push(enumStatement);
                statements.push(factory2.createEndOfDeclarationMarker(node));
                return statements;
            }