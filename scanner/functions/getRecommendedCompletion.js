function getRecommendedCompletion(previousToken, contextualType, checker) {
            return firstDefined(contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]), (type) => {
                const symbol = type && type.symbol;
                return symbol && (symbol.flags & (8 /* EnumMember */ | 384 /* Enum */ | 32 /* Class */) && !isAbstractConstructorSymbol(symbol)) ? getFirstSymbolInChain(symbol, previousToken, checker) : void 0;
            });
        }