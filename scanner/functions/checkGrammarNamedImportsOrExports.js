function checkGrammarNamedImportsOrExports(namedBindings) {
                return !!forEach(namedBindings.elements, (specifier) => {
                    if (specifier.isTypeOnly) {
                        return grammarErrorOnFirstToken(specifier, specifier.kind === 273 /* ImportSpecifier */ ? Diagnostics.The_type_modifier_cannot_be_used_on_a_named_import_when_import_type_is_used_on_its_import_statement : Diagnostics.The_type_modifier_cannot_be_used_on_a_named_export_when_export_type_is_used_on_its_export_statement);
                    }
                });
            }