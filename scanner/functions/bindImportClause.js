function bindImportClause(node) {
                if (node.name) {
                    declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }