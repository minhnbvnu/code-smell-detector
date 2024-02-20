function getHelperIndex(grammar, index) {
        while (grammar.hasOwnProperty(getHelperKey(index))) {
            index += 1;
        }
        return index;
    }