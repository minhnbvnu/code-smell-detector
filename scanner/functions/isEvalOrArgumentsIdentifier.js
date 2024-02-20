function isEvalOrArgumentsIdentifier(node) {
                return isIdentifier(node) && (node.escapedText === "eval" || node.escapedText === "arguments");
            }