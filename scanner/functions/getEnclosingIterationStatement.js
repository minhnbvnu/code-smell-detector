function getEnclosingIterationStatement(node) {
                return findAncestor(node, (n) => !n || nodeStartsNewLexicalEnvironment(n) ? "quit" : isIterationStatement(n, 
                /*lookInLabeledStatements*/
                false));
            }