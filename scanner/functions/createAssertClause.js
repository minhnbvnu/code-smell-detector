function createAssertClause(elements, multiLine) {
                const node = createBaseNode(296 /* AssertClause */);
                node.elements = createNodeArray(elements);
                node.multiLine = multiLine;
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }