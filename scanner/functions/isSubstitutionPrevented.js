function isSubstitutionPrevented(node) {
                return noSubstitution && node.id && noSubstitution[node.id];
            }