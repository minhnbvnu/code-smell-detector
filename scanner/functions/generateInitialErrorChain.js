function generateInitialErrorChain() {
                    const componentName = getTextOfNode(openingLikeElement.tagName);
                    return chainDiagnosticMessages(
                    /* details */
                    void 0, Diagnostics._0_cannot_be_used_as_a_JSX_component, componentName);
                }