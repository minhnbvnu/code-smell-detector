function containsObjectRestOrSpread(node) {
            if (node.transformFlags & 65536 /* ContainsObjectRestOrSpread */)
                return true;
            if (node.transformFlags & 128 /* ContainsES2018 */) {
                for (const element of getElementsOfBindingOrAssignmentPattern(node)) {
                    const target = getTargetOfBindingOrAssignmentElement(element);
                    if (target && isAssignmentPattern(target)) {
                        if (target.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                            return true;
                        }
                        if (target.transformFlags & 128 /* ContainsES2018 */) {
                            if (containsObjectRestOrSpread(target))
                                return true;
                        }
                    }
                }
            }
            return false;
        }