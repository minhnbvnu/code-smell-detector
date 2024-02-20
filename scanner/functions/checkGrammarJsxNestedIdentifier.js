function checkGrammarJsxNestedIdentifier(name) {
                    if (isIdentifier(name) && idText(name).indexOf(":") !== -1) {
                        return grammarErrorOnNode(name, Diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names);
                    }
                }