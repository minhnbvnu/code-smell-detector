function containsLexicalSuperInStaticInitializer(node) {
                for (const member of node.members) {
                    if (isClassStaticBlockDeclaration(member) || isPropertyDeclaration(member) && hasStaticModifier(member)) {
                        if (member.transformFlags & 134217728 /* ContainsLexicalSuper */) {
                            return true;
                        }
                    }
                }
                return false;
            }