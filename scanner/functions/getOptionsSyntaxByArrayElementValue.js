function getOptionsSyntaxByArrayElementValue(name, value) {
                const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
                return compilerOptionsObjectLiteralSyntax && getPropertyArrayElementValue(compilerOptionsObjectLiteralSyntax, name, value);
            }