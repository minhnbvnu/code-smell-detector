function cloneSourceFileWorker(source) {
                const node = baseFactory2.createBaseSourceFileNode(308 /* SourceFile */);
                node.flags |= source.flags & ~8 /* Synthesized */;
                for (const p in source) {
                    if (hasProperty(node, p) || !hasProperty(source, p)) {
                        continue;
                    }
                    if (p === "emitNode") {
                        node.emitNode = void 0;
                        continue;
                    }
                    node[p] = source[p];
                }
                return node;
            }