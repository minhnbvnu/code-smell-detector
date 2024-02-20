function isTypeRelatedTo(source, target, relation) {
                if (isFreshLiteralType(source)) {
                    source = source.regularType;
                }
                if (isFreshLiteralType(target)) {
                    target = target.regularType;
                }
                if (source === target) {
                    return true;
                }
                if (relation !== identityRelation) {
                    if (relation === comparableRelation && !(target.flags & 131072 /* Never */) && isSimpleTypeRelatedTo(target, source, relation) || isSimpleTypeRelatedTo(source, target, relation)) {
                        return true;
                    }
                }
                else if (!((source.flags | target.flags) & (3145728 /* UnionOrIntersection */ | 8388608 /* IndexedAccess */ | 16777216 /* Conditional */ | 33554432 /* Substitution */))) {
                    if (source.flags !== target.flags)
                        return false;
                    if (source.flags & 67358815 /* Singleton */)
                        return true;
                }
                if (source.flags & 524288 /* Object */ && target.flags & 524288 /* Object */) {
                    const related = relation.get(getRelationKey(source, target, 0 /* None */, relation, 
                    /*ignoreConstraints*/
                    false));
                    if (related !== void 0) {
                        return !!(related & 1 /* Succeeded */);
                    }
                }
                if (source.flags & 469499904 /* StructuredOrInstantiable */ || target.flags & 469499904 /* StructuredOrInstantiable */) {
                    return checkTypeRelatedTo(source, target, relation, 
                    /*errorNode*/
                    void 0);
                }
                return false;
            }