function maybeAsiHazardAfter(node) {
                const t = node.type;
                if (t === "DoWhileStatement" ||
                    t === "BreakStatement" ||
                    t === "ContinueStatement" ||
                    t === "DebuggerStatement" ||
                    t === "ImportDeclaration" ||
                    t === "ExportAllDeclaration") {
                    return false;
                }
                if (t === "ReturnStatement") {
                    return Boolean(node.argument);
                }
                if (t === "ExportNamedDeclaration") {
                    return Boolean(node.declaration);
                }
                if (isEndOfArrowBlock(sourceCode.getLastToken(node, 1))) {
                    return false;
                }
                return true;
            }