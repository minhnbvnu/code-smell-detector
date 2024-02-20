function areLiteralsAndSameType(node) {
                return node.left.type === "Literal" && node.right.type === "Literal" &&
                    typeof node.left.value === typeof node.right.value;
            }