function doChange32(changes, sourceFile, { node }) {
            const newNode = factory.createToken(27 /* CommaToken */);
            changes.replaceNode(sourceFile, node, newNode);
        }