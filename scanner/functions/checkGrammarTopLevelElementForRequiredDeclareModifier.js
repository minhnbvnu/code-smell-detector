function checkGrammarTopLevelElementForRequiredDeclareModifier(node) {
                if (node.kind === 261 /* InterfaceDeclaration */ || node.kind === 262 /* TypeAliasDeclaration */ || node.kind === 269 /* ImportDeclaration */ || node.kind === 268 /* ImportEqualsDeclaration */ || node.kind === 275 /* ExportDeclaration */ || node.kind === 274 /* ExportAssignment */ || node.kind === 267 /* NamespaceExportDeclaration */ || hasSyntacticModifier(node, 2 /* Ambient */ | 1 /* Export */ | 1024 /* Default */)) {
                    return false;
                }
                return grammarErrorOnFirstToken(node, Diagnostics.Top_level_declarations_in_d_ts_files_must_start_with_either_a_declare_or_export_modifier);
            }