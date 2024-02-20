function isKnownProperty(targetType, name, isComparingJsxAttributes) {
                if (targetType.flags & 524288 /* Object */) {
                    if (getPropertyOfObjectType(targetType, name) || getApplicableIndexInfoForName(targetType, name) || isLateBoundName(name) && getIndexInfoOfType(targetType, stringType) || isComparingJsxAttributes && isHyphenatedJsxName(name)) {
                        return true;
                    }
                }
                else if (targetType.flags & 3145728 /* UnionOrIntersection */ && isExcessPropertyCheckTarget(targetType)) {
                    for (const t of targetType.types) {
                        if (isKnownProperty(t, name, isComparingJsxAttributes)) {
                            return true;
                        }
                    }
                }
                return false;
            }