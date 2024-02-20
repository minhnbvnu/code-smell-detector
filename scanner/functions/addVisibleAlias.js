function addVisibleAlias(declaration, aliasingStatement) {
                    if (shouldComputeAliasToMakeVisible) {
                        getNodeLinks(declaration).isVisible = true;
                        aliasesToMakeVisible = appendIfUnique(aliasesToMakeVisible, aliasingStatement);
                    }
                    return true;
                }