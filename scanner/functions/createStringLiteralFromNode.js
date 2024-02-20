function createStringLiteralFromNode(sourceNode) {
                const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), 
                /*isSingleQuote*/
                void 0);
                node.textSourceNode = sourceNode;
                return node;
            }