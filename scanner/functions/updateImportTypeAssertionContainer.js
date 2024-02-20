function updateImportTypeAssertionContainer(node, clause, multiLine) {
                return node.assertClause !== clause || node.multiLine !== multiLine ? update(createImportTypeAssertionContainer(clause, multiLine), node) : node;
            }