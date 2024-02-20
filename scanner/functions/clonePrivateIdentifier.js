function clonePrivateIdentifier(node) {
                const clone2 = createBasePrivateIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                return clone2;
            }