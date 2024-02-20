function getCombinedNodeFlagsAlwaysIncludeJSDoc(node) {
            return getCombinedFlags(node, getEffectiveModifierFlagsAlwaysIncludeJSDoc);
        }