function getEffectiveModifierFlagsAlwaysIncludeJSDoc(node) {
            return getModifierFlagsWorker(node, 
            /*includeJSDOc*/
            true, 
            /*alwaysIncludeJSDOc*/
            true);
        }