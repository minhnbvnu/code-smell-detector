function propagateChildFlags(child) {
            if (!child)
                return 0 /* None */;
            const childFlags = child.transformFlags & ~getTransformFlagsSubtreeExclusions(child.kind);
            return isNamedDeclaration(child) && isPropertyName(child.name) ? propagatePropertyNameFlagsOfChild(child.name, childFlags) : childFlags;
        }