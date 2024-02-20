function cloneSourceFile(source) {
                const node = source.redirectInfo ? cloneRedirectedSourceFile(source) : cloneSourceFileWorker(source);
                setOriginalNode(node, source);
                return node;
            }