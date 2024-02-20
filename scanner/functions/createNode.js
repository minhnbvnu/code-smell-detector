function createNode(kind, pos, end, parent2) {
            const node = isNodeKind(kind) ? new NodeObject(kind, pos, end) : kind === 79 /* Identifier */ ? new IdentifierObject(79 /* Identifier */, pos, end) : kind === 80 /* PrivateIdentifier */ ? new PrivateIdentifierObject(80 /* PrivateIdentifier */, pos, end) : new TokenObject(kind, pos, end);
            node.parent = parent2;
            node.flags = parent2.flags & 50720768 /* ContextFlags */;
            return node;
        }