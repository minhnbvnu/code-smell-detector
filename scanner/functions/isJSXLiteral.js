function isJSXLiteral(node) {
                return node.parent.type === "JSXAttribute" || node.parent.type === "JSXElement" || node.parent.type === "JSXFragment";
            }