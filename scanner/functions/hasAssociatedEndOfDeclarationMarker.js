function hasAssociatedEndOfDeclarationMarker(node) {
                return (getEmitFlags(node) & 8388608 /* HasEndOfDeclarationMarker */) !== 0;
            }