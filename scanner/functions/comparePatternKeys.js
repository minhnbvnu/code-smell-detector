function comparePatternKeys(a, b) {
            const aPatternIndex = a.indexOf("*");
            const bPatternIndex = b.indexOf("*");
            const baseLenA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
            const baseLenB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
            if (baseLenA > baseLenB)
                return -1;
            if (baseLenB > baseLenA)
                return 1;
            if (aPatternIndex === -1)
                return 1;
            if (bPatternIndex === -1)
                return -1;
            if (a.length > b.length)
                return -1;
            if (b.length > a.length)
                return 1;
            return 0;
        }