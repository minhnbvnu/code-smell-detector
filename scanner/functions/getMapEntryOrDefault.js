function getMapEntryOrDefault(identifier) {
                const originalNode = getOriginalNode2(identifier);
                const symbol = getSymbol2(originalNode);
                if (!symbol) {
                    return createSynthIdentifier(identifier, types);
                }
                const mapEntry = transformer.synthNamesMap.get(getSymbolId(symbol).toString());
                return mapEntry || createSynthIdentifier(identifier, types);
            }