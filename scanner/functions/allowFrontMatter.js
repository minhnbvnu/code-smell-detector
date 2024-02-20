function allowFrontMatter() {
        if (!allow(16 /* BlockCode */))
            return false;
        for (const block of stack) {
            for (const node of block.nodes) {
                if (!(0, type_guards_1.isBlank)(node)) {
                    return false;
                }
            }
        }
        return true;
    }