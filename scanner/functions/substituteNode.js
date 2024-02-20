function substituteNode(hint, node) {
                Debug.assert(state < 3 /* Disposed */, "Cannot substitute a node after the result is disposed.");
                return node && isSubstitutionEnabled(node) && onSubstituteNode(hint, node) || node;
            }