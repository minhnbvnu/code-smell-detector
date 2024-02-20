function isGrammarErrorElement(nodeArray, child, isElement) {
            if (!nodeArray || isArray(child) || !isElement(child))
                return false;
            return contains(nodeArray, child);
        }