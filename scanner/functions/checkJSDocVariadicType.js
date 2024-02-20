function checkJSDocVariadicType(node) {
                checkJSDocTypeIsInJsFile(node);
                checkSourceElement(node.type);
                const { parent: parent2 } = node;
                if (isParameter(parent2) && isJSDocFunctionType(parent2.parent)) {
                    if (last(parent2.parent.parameters) !== parent2) {
                        error(node, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }
                    return;
                }
                if (!isJSDocTypeExpression(parent2)) {
                    error(node, Diagnostics.JSDoc_may_only_appear_in_the_last_parameter_of_a_signature);
                }
                const paramTag = node.parent.parent;
                if (!isJSDocParameterTag(paramTag)) {
                    error(node, Diagnostics.JSDoc_may_only_appear_in_the_last_parameter_of_a_signature);
                    return;
                }
                const param = getParameterSymbolFromJSDoc(paramTag);
                if (!param) {
                    return;
                }
                const host2 = getHostSignatureFromJSDoc(paramTag);
                if (!host2 || last(host2.parameters).symbol !== param) {
                    error(node, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                }
            }