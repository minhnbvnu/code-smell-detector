function compareChildren(child1, child2) {
            return compareStringsCaseSensitiveUI(tryGetName(child1.node), tryGetName(child2.node)) || compareValues(navigationBarNodeKind(child1), navigationBarNodeKind(child2));
        }