function getRestParameterElementType(node) {
            if (node && node.kind === 185 /* ArrayType */) {
                return node.elementType;
            }
            else if (node && node.kind === 180 /* TypeReference */) {
                return singleOrUndefined(node.typeArguments);
            }
            else {
                return void 0;
            }
        }