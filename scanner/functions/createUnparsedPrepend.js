function createUnparsedPrepend(data, texts) {
                const node = createBaseUnparsedNode(304 /* UnparsedPrepend */, data);
                node.texts = texts;
                return node;
            }