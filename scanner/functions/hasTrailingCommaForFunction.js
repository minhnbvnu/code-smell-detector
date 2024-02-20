function hasTrailingCommaForFunction(node) {
            const length = node.params.length

            return (
                length >= 1 &&
                sourceCode.getTokenAfter(node.params[length - 1]).value === ","
            )
        }