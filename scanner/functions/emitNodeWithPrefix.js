function emitNodeWithPrefix(prefix, prefixWriter, node, emit2) {
                if (node) {
                    prefixWriter(prefix);
                    emit2(node);
                }
            }