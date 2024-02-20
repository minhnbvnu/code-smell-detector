function visitThisKeyword(node) {
                if (hierarchyFacts & 2 /* ArrowFunction */ && !(hierarchyFacts & 16384 /* StaticInitializer */)) {
                    hierarchyFacts |= 65536 /* CapturedLexicalThis */;
                }
                if (convertedLoopState) {
                    if (hierarchyFacts & 2 /* ArrowFunction */) {
                        convertedLoopState.containsLexicalThis = true;
                        return node;
                    }
                    return convertedLoopState.thisName || (convertedLoopState.thisName = factory2.createUniqueName("this"));
                }
                return node;
            }