function getInfo14(sourceFile, program, pos) {
            const { parent: parent2 } = getTokenAtPosition(sourceFile, pos);
            if (!isRequireCall(parent2, 
            /*checkArgumentIsStringLiteralLike*/
            true)) {
                throw Debug.failBadSyntaxKind(parent2);
            }
            const decl = cast(parent2.parent, isVariableDeclaration);
            const defaultImportName = tryCast(decl.name, isIdentifier);
            const namedImports = isObjectBindingPattern(decl.name) ? tryCreateNamedImportsFromObjectBindingPattern(decl.name) : void 0;
            if (defaultImportName || namedImports) {
                return {
                    allowSyntheticDefaults: getAllowSyntheticDefaultImports(program.getCompilerOptions()),
                    defaultImportName,
                    namedImports,
                    statement: cast(decl.parent.parent, isVariableStatement),
                    required: first(parent2.arguments)
                };
            }
        }