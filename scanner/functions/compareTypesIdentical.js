function compareTypesIdentical(source, target) {
                return isTypeRelatedTo(source, target, identityRelation) ? -1 /* True */ : 0 /* False */;
            }