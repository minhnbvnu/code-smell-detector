function propagatePropertyNameFlagsOfChild(node, transformFlags) {
            return transformFlags | node.transformFlags & 134234112 /* PropertyNamePropagatingFlags */;
        }