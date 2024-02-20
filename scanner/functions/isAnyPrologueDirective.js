function isAnyPrologueDirective(node) {
            return isPrologueDirective(node) || !!(getEmitFlags(node) & 2097152 /* CustomPrologue */);
        }