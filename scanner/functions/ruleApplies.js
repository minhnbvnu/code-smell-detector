function ruleApplies(node) {
                if (node.type === "JSXElement" || node.type === "JSXFragment") {
                    const isSingleLine = node.loc.start.line === node.loc.end.line;
                    switch (IGNORE_JSX) {
                        // Exclude this JSX element from linting
                        case "all":
                            return false;
                        // Exclude this JSX element if it is multi-line element
                        case "multi-line":
                            return isSingleLine;
                        // Exclude this JSX element if it is single-line element
                        case "single-line":
                            return !isSingleLine;
                        // Nothing special to be done for JSX elements
                        case "none":
                            break;
                        // no default
                    }
                }
                if (node.type === "SequenceExpression" && IGNORE_SEQUENCE_EXPRESSIONS) {
                    return false;
                }
                if (isImmediateFunctionPrototypeMethodCall(node) && IGNORE_FUNCTION_PROTOTYPE_METHODS) {
                    return false;
                }
                return ALL_NODES || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression";
            }