function anyTokenExcept(...tokens) {
                return { tokens: allTokens.filter((t) => !tokens.some((t2) => t2 === t)), isSpecific: false };
            }