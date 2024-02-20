function createUnparsedSource(prologues, syntheticReferences, texts) {
                const node = createBaseNode(310 /* UnparsedSource */);
                node.prologues = prologues;
                node.syntheticReferences = syntheticReferences;
                node.texts = texts;
                node.fileName = "";
                node.text = "";
                node.referencedFiles = emptyArray;
                node.libReferenceDirectives = emptyArray;
                node.getLineAndCharacterOfPosition = (pos) => getLineAndCharacterOfPosition(node, pos);
                return node;
            }