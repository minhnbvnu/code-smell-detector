function getBestMatchingType(source, target, isRelatedTo = compareTypesAssignable) {
                return findMatchingDiscriminantType(source, target, isRelatedTo, 
                /*skipPartial*/
                true) || findMatchingTypeReferenceOrTypeAliasReference(source, target) || findBestTypeForObjectLiteral(source, target) || findBestTypeForInvokable(source, target) || findMostOverlappyType(source, target);
            }