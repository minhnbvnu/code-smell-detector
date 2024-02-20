function checkGrammarJsxElement(node) {
                checkGrammarJsxName(node.tagName);
                checkGrammarTypeArguments(node, node.typeArguments);
                const seen = /* @__PURE__ */ new Map();
                for (const attr of node.attributes.properties) {
                    if (attr.kind === 290 /* JsxSpreadAttribute */) {
                        continue;
                    }
                    const { name, initializer } = attr;
                    if (!seen.get(name.escapedText)) {
                        seen.set(name.escapedText, true);
                    }
                    else {
                        return grammarErrorOnNode(name, Diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name);
                    }
                    if (initializer && initializer.kind === 291 /* JsxExpression */ && !initializer.expression) {
                        return grammarErrorOnNode(initializer, Diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression);
                    }
                }
            }