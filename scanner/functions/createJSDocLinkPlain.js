function createJSDocLinkPlain(name, text) {
                const node = createBaseNode(329 /* JSDocLinkPlain */);
                node.name = name;
                node.text = text;
                return node;
            }