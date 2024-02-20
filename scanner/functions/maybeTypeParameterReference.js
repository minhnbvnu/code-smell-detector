function maybeTypeParameterReference(node) {
                return !(node.parent.kind === 180 /* TypeReference */ && node.parent.typeArguments && node === node.parent.typeName || node.parent.kind === 202 /* ImportType */ && node.parent.typeArguments && node === node.parent.qualifier);
            }