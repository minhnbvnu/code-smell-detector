function isSubstitutionEnabled(node) {
                return (enabledSyntaxKindFeatures[node.kind] & 1 /* Substitution */) !== 0 && (getEmitFlags(node) & 8 /* NoSubstitution */) === 0;
            }