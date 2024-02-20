function checkGrammarExportDeclaration(node) {
                var _a2;
                if (node.isTypeOnly && ((_a2 = node.exportClause) == null ? void 0 : _a2.kind) === 276 /* NamedExports */) {
                    return checkGrammarNamedImportsOrExports(node.exportClause);
                }
                return false;
            }