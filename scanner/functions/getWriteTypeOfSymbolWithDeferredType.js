function getWriteTypeOfSymbolWithDeferredType(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.writeType && links.deferralWriteConstituents) {
                    Debug.assertIsDefined(links.deferralParent);
                    Debug.assertIsDefined(links.deferralConstituents);
                    links.writeType = links.deferralParent.flags & 1048576 /* Union */ ? getUnionType(links.deferralWriteConstituents) : getIntersectionType(links.deferralWriteConstituents);
                }
                return links.writeType;
            }