function getClassAliasIfNeeded(node) {
                if (resolver.getNodeCheckFlags(node) & 1048576 /* ClassWithConstructorReference */) {
                    enableSubstitutionForClassAliases();
                    const classAlias = factory2.createUniqueName(node.name && !isGeneratedIdentifier(node.name) ? idText(node.name) : "default");
                    classAliases[getOriginalNodeId(node)] = classAlias;
                    hoistVariableDeclaration(classAlias);
                    return classAlias;
                }
            }