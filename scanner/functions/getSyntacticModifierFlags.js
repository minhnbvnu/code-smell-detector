function getSyntacticModifierFlags(node) {
            return getModifierFlagsWorker(node, 
            /*includeJSDoc*/
            false);
        }