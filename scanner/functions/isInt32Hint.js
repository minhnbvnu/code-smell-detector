function isInt32Hint(node) {
                return int32Hint && node.operator === "|" && node.right &&
                    node.right.type === "Literal" && node.right.value === 0;
            }