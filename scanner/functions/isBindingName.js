function isBindingName(node) {
            const kind = node.kind;
            return kind === 79 /* Identifier */ || kind === 203 /* ObjectBindingPattern */ || kind === 204 /* ArrayBindingPattern */;
        }