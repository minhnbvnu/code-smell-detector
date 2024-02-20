function addMissingConstraint(changes, program, preferences, host, sourceFile, info) {
            const { declaration, constraint } = info;
            const checker = program.getTypeChecker();
            if (isString(constraint)) {
                changes.insertText(sourceFile, declaration.name.end, ` extends ${constraint}`);
            }
            else {
                const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
                const tracker = getNoopSymbolTrackerWithResolver({ program, host });
                const importAdder = createImportAdder(sourceFile, program, preferences, host);
                const typeNode = typeToAutoImportableTypeNode(checker, importAdder, constraint, 
                /*contextNode*/
                void 0, scriptTarget, 
                /*flags*/
                void 0, tracker);
                if (typeNode) {
                    changes.replaceNode(sourceFile, declaration, factory.updateTypeParameterDeclaration(declaration, 
                    /*modifiers*/
                    void 0, declaration.name, typeNode, declaration.default));
                    importAdder.writeFixes(changes);
                }
            }
        }