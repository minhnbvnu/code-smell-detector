function getRelationKey(source, target, intersectionState, relation, ignoreConstraints) {
                if (relation === identityRelation && source.id > target.id) {
                    const temp = source;
                    source = target;
                    target = temp;
                }
                const postFix = intersectionState ? ":" + intersectionState : "";
                return isTypeReferenceWithGenericArguments(source) && isTypeReferenceWithGenericArguments(target) ? getGenericTypeReferenceRelationKey(source, target, postFix, ignoreConstraints) : `${source.id},${target.id}${postFix}`;
            }