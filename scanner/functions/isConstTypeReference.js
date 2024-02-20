function isConstTypeReference(node) {
            return isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "const" && !node.typeArguments;
        }