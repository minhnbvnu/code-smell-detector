function looksLikeDirective(node) {
                return node.type === "ExpressionStatement" &&
                    node.expression.type === "Literal" && typeof node.expression.value === "string";
            }