function entryToDeclaration(entry) {
            if (isDeclaration(entry.node.parent)) {
                return entry.node;
            }
            return void 0;
        }