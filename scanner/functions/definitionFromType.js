function definitionFromType(type, checker, node, failedAliasResolution) {
            return flatMap(type.isUnion() && !(type.flags & 32 /* Enum */) ? type.types : [type], (t) => t.symbol && getDefinitionFromSymbol(checker, t.symbol, node, failedAliasResolution));
        }