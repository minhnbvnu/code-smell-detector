function isRequireCall(node) {
                return node.callee.type === "Identifier" && node.callee.name === "require";
            }