function visitImportEqualsDeclaration(node) {
                Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");
                let statements;
                statements = append(statements, setOriginalNode(setTextRange(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.cloneNode(node.name), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, createRequireCall2(node))
                ], 
                /*flags*/
                languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */)), node), node));
                statements = appendExportsOfImportEqualsDeclaration(statements, node);
                return singleOrMany(statements);
            }