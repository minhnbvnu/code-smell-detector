function deriveSelector(visibilityInfo, deriveFrom) {
                var newSelector = deriveFrom.createDerived(deriveFrom.elements, deriveFrom.extendList, deriveFrom.evaldCondition);
                newSelector.copyVisibilityInfo(visibilityInfo);
                return newSelector;
            }