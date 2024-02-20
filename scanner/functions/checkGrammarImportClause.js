function checkGrammarImportClause(node) {
                var _a2;
                if (node.isTypeOnly && node.name && node.namedBindings) {
                    return grammarErrorOnNode(node, Diagnostics.A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both);
                }
                if (node.isTypeOnly && ((_a2 = node.namedBindings) == null ? void 0 : _a2.kind) === 272 /* NamedImports */) {
                    return checkGrammarNamedImportsOrExports(node.namedBindings);
                }
                return false;
            }