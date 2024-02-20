function transformEnumBody(node, localName) {
                const savedCurrentNamespaceLocalName = currentNamespaceContainerName;
                currentNamespaceContainerName = localName;
                const statements = [];
                startLexicalEnvironment();
                const members = map(node.members, transformEnumMember);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                addRange(statements, members);
                currentNamespaceContainerName = savedCurrentNamespaceLocalName;
                return factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                node.members), 
                /*multiLine*/
                true);
            }