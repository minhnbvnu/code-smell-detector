function transformClassBody(node, extendsClauseElement) {
                const statements = [];
                const name = factory2.getInternalName(node);
                const constructorLikeName = isIdentifierANonContextualKeyword(name) ? factory2.getGeneratedNameForNode(name) : name;
                startLexicalEnvironment();
                addExtendsHelperIfNeeded(statements, node, extendsClauseElement);
                addConstructor(statements, node, constructorLikeName, extendsClauseElement);
                addClassMembers(statements, node);
                const closingBraceLocation = createTokenRange(skipTrivia(currentText, node.members.end), 19 /* CloseBraceToken */);
                const outer = factory2.createPartiallyEmittedExpression(constructorLikeName);
                setTextRangeEnd(outer, closingBraceLocation.end);
                setEmitFlags(outer, 3072 /* NoComments */);
                const statement = factory2.createReturnStatement(outer);
                setTextRangePos(statement, closingBraceLocation.pos);
                setEmitFlags(statement, 3072 /* NoComments */ | 768 /* NoTokenSourceMaps */);
                statements.push(statement);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                node.members), 
                /*multiLine*/
                true);
                setEmitFlags(block, 3072 /* NoComments */);
                return block;
            }