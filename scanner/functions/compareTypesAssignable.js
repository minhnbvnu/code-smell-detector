function compareTypesAssignable(source, target) {
                return isTypeRelatedTo(source, target, assignableRelation) ? -1 /* True */ : 0 /* False */;
            }