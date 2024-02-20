function getModifierFlagsWorker(node, includeJSDoc, alwaysIncludeJSDoc) {
            if (node.kind >= 0 /* FirstToken */ && node.kind <= 162 /* LastToken */) {
                return 0 /* None */;
            }
            if (!(node.modifierFlagsCache & 536870912 /* HasComputedFlags */)) {
                node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | 536870912 /* HasComputedFlags */;
            }
            if (includeJSDoc && !(node.modifierFlagsCache & 4096 /* HasComputedJSDocModifiers */) && (alwaysIncludeJSDoc || isInJSFile(node)) && node.parent) {
                node.modifierFlagsCache |= getJSDocModifierFlagsNoCache(node) | 4096 /* HasComputedJSDocModifiers */;
            }
            return node.modifierFlagsCache & ~(536870912 /* HasComputedFlags */ | 4096 /* HasComputedJSDocModifiers */);
        }