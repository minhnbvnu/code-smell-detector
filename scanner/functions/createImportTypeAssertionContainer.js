function createImportTypeAssertionContainer(clause, multiLine) {
                const node = createBaseNode(298 /* ImportTypeAssertionContainer */);
                node.assertClause = clause;
                node.multiLine = multiLine;
                return node;
            }