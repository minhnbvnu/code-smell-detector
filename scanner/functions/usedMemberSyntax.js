function usedMemberSyntax(node) {
                if (node.specifiers.length === 0) {
                    return "none";
                }
                if (node.specifiers[0].type === "ImportNamespaceSpecifier") {
                    return "all";
                }
                if (node.specifiers.length === 1) {
                    return "single";
                }
                return "multiple";
            }