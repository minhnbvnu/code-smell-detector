function extendsNull(node) {
            return (
                node.superClass != null &&
                node.superClass.type === "Literal" &&
                node.superClass.value === null
            )
        }