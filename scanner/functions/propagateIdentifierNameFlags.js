function propagateIdentifierNameFlags(node) {
            return propagateChildFlags(node) & ~67108864 /* ContainsPossibleTopLevelAwait */;
        }