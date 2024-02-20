function addVarForEnumOrModuleDeclaration(statements, node) {
                const statement = factory2.createVariableStatement(visitNodes2(node.modifiers, modifierVisitor, isModifier), factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.getLocalName(node, 
                    /*allowComments*/
                    false, 
                    /*allowSourceMaps*/
                    true))
                ], currentLexicalScope.kind === 308 /* SourceFile */ ? 0 /* None */ : 1 /* Let */));
                setOriginalNode(statement, node);
                recordEmittedDeclarationInScope(node);
                if (isFirstEmittedDeclarationInScope(node)) {
                    if (node.kind === 263 /* EnumDeclaration */) {
                        setSourceMapRange(statement.declarationList, node);
                    }
                    else {
                        setSourceMapRange(statement, node);
                    }
                    setCommentRange(statement, node);
                    addEmitFlags(statement, 2048 /* NoTrailingComments */ | 8388608 /* HasEndOfDeclarationMarker */);
                    statements.push(statement);
                    return true;
                }
                else {
                    const mergeMarker = factory2.createMergeDeclarationMarker(statement);
                    setEmitFlags(mergeMarker, 3072 /* NoComments */ | 8388608 /* HasEndOfDeclarationMarker */);
                    statements.push(mergeMarker);
                    return false;
                }
            }