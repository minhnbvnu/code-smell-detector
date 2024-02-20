function isGetOrSetAccessorDeclaration(node) {
            return node.kind === 175 /* SetAccessor */ || node.kind === 174 /* GetAccessor */;
        }