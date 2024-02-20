function compareTypesSubtypeOf(source, target) {
                return isTypeRelatedTo(source, target, subtypeRelation) ? -1 /* True */ : 0 /* False */;
            }