function createJSDocLink(name, text) {
                const node = createBaseNode(327 /* JSDocLink */);
                node.name = name;
                node.text = text;
                return node;
            }