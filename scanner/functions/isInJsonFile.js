function isInJsonFile(node) {
            return !!node && !!(node.flags & 67108864 /* JsonFile */);
        }