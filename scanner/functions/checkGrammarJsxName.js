function checkGrammarJsxName(node) {
                if (isPropertyAccessExpression(node)) {
                    let propName = node;
                    do {
                        const check2 = checkGrammarJsxNestedIdentifier(propName.name);
                        if (check2) {
                            return check2;
                        }
                        propName = propName.expression;
                    } while (isPropertyAccessExpression(propName));
                    const check = checkGrammarJsxNestedIdentifier(propName);
                    if (check) {
                        return check;
                    }
                }
                function checkGrammarJsxNestedIdentifier(name) {
                    if (isIdentifier(name) && idText(name).indexOf(":") !== -1) {
                        return grammarErrorOnNode(name, Diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names);
                    }
                }
            }