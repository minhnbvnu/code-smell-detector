function getTypeOfSymbolWithDeferredType(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    Debug.assertIsDefined(links.deferralParent);
                    Debug.assertIsDefined(links.deferralConstituents);
                    links.type = links.deferralParent.flags & 1048576 /* Union */ ? getUnionType(links.deferralConstituents) : getIntersectionType(links.deferralConstituents);
                }
                return links.type;
            }