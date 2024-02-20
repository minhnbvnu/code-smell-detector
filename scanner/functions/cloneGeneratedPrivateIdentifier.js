function cloneGeneratedPrivateIdentifier(node) {
                const clone2 = createBasePrivateIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                setIdentifierAutoGenerate(clone2, { ...node.emitNode.autoGenerate });
                return clone2;
            }