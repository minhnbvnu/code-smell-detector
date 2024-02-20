function checkTemplateExpression(node) {
                const texts = [node.head.text];
                const types = [];
                for (const span of node.templateSpans) {
                    const type = checkExpression(span.expression);
                    if (maybeTypeOfKindConsideringBaseConstraint(type, 12288 /* ESSymbolLike */)) {
                        error(span.expression, Diagnostics.Implicit_conversion_of_a_symbol_to_a_string_will_fail_at_runtime_Consider_wrapping_this_expression_in_String);
                    }
                    texts.push(span.literal.text);
                    types.push(isTypeAssignableTo(type, templateConstraintType) ? type : stringType);
                }
                return isConstContext(node) || isTemplateLiteralContext(node) || someType(getContextualType2(node, 
                /*contextFlags*/
                void 0) || unknownType, isTemplateLiteralContextualType) ? getTemplateLiteralType(texts, types) : stringType;
            }