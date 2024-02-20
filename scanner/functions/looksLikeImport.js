function looksLikeImport(node) {
                return node.type === "ImportDeclaration" || node.type === "ImportSpecifier" ||
                    node.type === "ImportDefaultSpecifier" || node.type === "ImportNamespaceSpecifier";
            }