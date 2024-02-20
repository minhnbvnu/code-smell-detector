function getTypeParameterFromJsDoc(node) {
            const name = node.name.escapedText;
            const { typeParameters } = node.parent.parent.parent;
            return typeParameters && find(typeParameters, (p) => p.name.escapedText === name);
        }