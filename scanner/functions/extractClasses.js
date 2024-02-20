function extractClasses() {
        // Get classes for registration from standalone deck.gl
        const classesDict = {};
        const deck = window.deck;
        const classes = Object.keys(deck).filter(x => x.charAt(0) === x.charAt(0).toUpperCase());
        for (const cls of classes) {
            classesDict[cls] = deck[cls];
        }
        return classesDict;
    }