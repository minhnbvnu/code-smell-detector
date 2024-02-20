function validateRegExpString(node) {
            const patternNode = node.arguments[0]
            const flagsNode = node.arguments[1]
            const pattern =
                patternNode &&
                patternNode.type === "Literal" &&
                typeof patternNode.value === "string"
                    ? patternNode.value
                    : null
            const flags =
                flagsNode &&
                flagsNode.type === "Literal" &&
                typeof flagsNode.value === "string"
                    ? flagsNode.value
                    : null
            validateRegExp(pattern, flags, node)
        }