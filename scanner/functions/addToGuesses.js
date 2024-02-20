function addToGuesses (name, offsets) {
        var i, offset;
        arrayToInt(offsets);
        for (i = 0; i < offsets.length; i++) {
            offset = offsets[i];
            guesses[offset] = guesses[offset] || {};
            guesses[offset][name] = true;
        }
    }