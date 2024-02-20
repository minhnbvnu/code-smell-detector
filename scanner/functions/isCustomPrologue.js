function isCustomPrologue(node) {
            return !!(getEmitFlags(node) & 2097152 /* CustomPrologue */);
        }