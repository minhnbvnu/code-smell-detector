function checkStrictModeNumericLiteral(node) {
                if (languageVersion < 1 /* ES5 */ && inStrictMode && node.numericLiteralFlags & 32 /* Octal */) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Octal_literals_are_not_allowed_in_strict_mode));
                }
            }