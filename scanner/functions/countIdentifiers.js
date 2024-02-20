function countIdentifiers(parsedSelector) {
        switch (parsedSelector.type) {
            case "child":
            case "descendant":
            case "sibling":
            case "adjacent":
                return countIdentifiers(parsedSelector.left) + countIdentifiers(parsedSelector.right);
            case "compound":
            case "not":
            case "matches":
                return parsedSelector.selectors.reduce((sum, childSelector) => sum + countIdentifiers(childSelector), 0);
            case "identifier":
                return 1;
            default:
                return 0;
        }
    }