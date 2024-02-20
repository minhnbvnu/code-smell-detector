function isFromInferenceBlockedSource(type) {
                return !!(type.symbol && some(type.symbol.declarations, hasSkipDirectInferenceFlag));
            }