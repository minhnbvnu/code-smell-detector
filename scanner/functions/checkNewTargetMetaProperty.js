function checkNewTargetMetaProperty(node) {
                const container = getNewTargetContainer(node);
                if (!container) {
                    error(node, Diagnostics.Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constructor, "new.target");
                    return errorType;
                }
                else if (container.kind === 173 /* Constructor */) {
                    const symbol = getSymbolOfDeclaration(container.parent);
                    return getTypeOfSymbol(symbol);
                }
                else {
                    const symbol = getSymbolOfDeclaration(container);
                    return getTypeOfSymbol(symbol);
                }
            }