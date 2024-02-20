function transformClassDeclarationWithClassDecorators(node, name) {
                const location = moveRangePastModifiers(node);
                const classAlias = getClassAliasIfNeeded(node);
                const declName = languageVersion <= 2 /* ES2015 */ ? factory2.getInternalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                let members = visitNodes2(node.members, visitor, isClassElement);
                let decorationStatements = [];
                ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));
                const classExpression = factory2.createClassExpression(
                /*modifiers*/
                void 0, name && isGeneratedIdentifier(name) ? void 0 : name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                setOriginalNode(classExpression, node);
                setTextRange(classExpression, location);
                const statement = factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(declName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, classAlias ? factory2.createAssignment(classAlias, classExpression) : classExpression)
                ], 1 /* Let */));
                setOriginalNode(statement, node);
                setTextRange(statement, location);
                setCommentRange(statement, node);
                const statements = [statement];
                addRange(statements, decorationStatements);
                addConstructorDecorationStatement(statements, node);
                return statements;
            }