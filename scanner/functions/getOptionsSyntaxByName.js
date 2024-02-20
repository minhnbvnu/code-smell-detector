function getOptionsSyntaxByName(name) {
                const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
                return compilerOptionsObjectLiteralSyntax && getPropertyAssignment(compilerOptionsObjectLiteralSyntax, name);
            }