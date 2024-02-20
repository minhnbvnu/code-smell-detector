function importClauseFromImported(decl) {
                return decl.kind === 270 /* ImportClause */ ? decl : decl.kind === 271 /* NamespaceImport */ ? decl.parent : decl.parent.parent;
            }