function countClassAttributes(parsedSelector) {
        switch (parsedSelector.type) {
            case "child":
            case "descendant":
            case "sibling":
            case "adjacent":
                return countClassAttributes(parsedSelector.left) + countClassAttributes(parsedSelector.right);
            case "compound":
            case "not":
            case "matches":
                return parsedSelector.selectors.reduce((sum, childSelector) => sum + countClassAttributes(childSelector), 0);
            case "attribute":
            case "field":
            case "nth-child":
            case "nth-last-child":
                return 1;
            default:
                return 0;
        }
    }