function cloneIdentifier(node) {
                const clone2 = createBaseIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.jsDoc = node.jsDoc;
                clone2.flowNode = node.flowNode;
                clone2.symbol = node.symbol;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                const typeArguments = getIdentifierTypeArguments(node);
                if (typeArguments)
                    setIdentifierTypeArguments(clone2, typeArguments);
                return clone2;
            }