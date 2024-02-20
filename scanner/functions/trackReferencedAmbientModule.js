function trackReferencedAmbientModule(node, symbol) {
                const directives = resolver.getTypeReferenceDirectivesForSymbol(symbol, 67108863 /* All */);
                if (length(directives)) {
                    return recordTypeReferenceDirectivesIfNecessary(directives);
                }
                const container = getSourceFileOfNode(node);
                refs.set(getOriginalNodeId(container), container);
            }