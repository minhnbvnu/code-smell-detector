function isAccessor(node) {
            return node && (node.kind === 174 /* GetAccessor */ || node.kind === 175 /* SetAccessor */);
        }