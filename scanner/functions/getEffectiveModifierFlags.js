function getEffectiveModifierFlags(node) {
            return getModifierFlagsWorker(node, 
            /*includeJSDoc*/
            true);
        }