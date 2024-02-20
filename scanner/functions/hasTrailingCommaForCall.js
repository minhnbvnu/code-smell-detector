function hasTrailingCommaForCall(node) {
            return (
                node.arguments.length >= 1 &&
                sourceCode.getLastToken(node, 1).value === ","
            )
        }