function getCompilerOptionsObjectLiteralSyntax() {
                if (_compilerOptionsObjectLiteralSyntax === void 0) {
                    _compilerOptionsObjectLiteralSyntax = false;
                    const jsonObjectLiteral = getTsConfigObjectLiteralExpression(options.configFile);
                    if (jsonObjectLiteral) {
                        for (const prop of getPropertyAssignment(jsonObjectLiteral, "compilerOptions")) {
                            if (isObjectLiteralExpression(prop.initializer)) {
                                _compilerOptionsObjectLiteralSyntax = prop.initializer;
                                break;
                            }
                        }
                    }
                }
                return _compilerOptionsObjectLiteralSyntax || void 0;
            }