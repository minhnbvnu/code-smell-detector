function getEnclosingClassFromThisParameter(node) {
                const thisParameter = getThisParameterFromNodeContext(node);
                let thisType = (thisParameter == null ? void 0 : thisParameter.type) && getTypeFromTypeNode(thisParameter.type);
                if (thisType && thisType.flags & 262144 /* TypeParameter */) {
                    thisType = getConstraintOfTypeParameter(thisType);
                }
                if (thisType && getObjectFlags(thisType) & (3 /* ClassOrInterface */ | 4 /* Reference */)) {
                    return getTargetType(thisType);
                }
                return void 0;
            }