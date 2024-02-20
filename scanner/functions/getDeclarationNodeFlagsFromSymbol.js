function getDeclarationNodeFlagsFromSymbol(s) {
                return s.valueDeclaration ? getCombinedNodeFlags(s.valueDeclaration) : 0;
            }