function isInJSDoc(node) {
            return !!node && !!(node.flags & 8388608 /* JSDoc */);
        }