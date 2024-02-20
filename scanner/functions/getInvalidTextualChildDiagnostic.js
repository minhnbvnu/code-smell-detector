function getInvalidTextualChildDiagnostic() {
                    if (!invalidTextDiagnostic) {
                        const tagNameText = getTextOfNode(node.parent.tagName);
                        const childPropName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(node));
                        const childrenPropName = childPropName === void 0 ? "children" : unescapeLeadingUnderscores(childPropName);
                        const childrenTargetType = getIndexedAccessType(target, getStringLiteralType(childrenPropName));
                        const diagnostic = Diagnostics._0_components_don_t_accept_text_as_child_elements_Text_in_JSX_has_the_type_string_but_the_expected_type_of_1_is_2;
                        invalidTextDiagnostic = { ...diagnostic, key: "!!ALREADY FORMATTED!!", message: formatMessage(
                            /*_dummy*/
                            void 0, diagnostic, tagNameText, childrenPropName, typeToString(childrenTargetType)) };
                    }
                    return invalidTextDiagnostic;
                }