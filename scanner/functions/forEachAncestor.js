function forEachAncestor(node, callback) {
            while (true) {
                const res = callback(node);
                if (res === "quit")
                    return void 0;
                if (res !== void 0)
                    return res;
                if (isSourceFile(node))
                    return void 0;
                node = node.parent;
            }
        }