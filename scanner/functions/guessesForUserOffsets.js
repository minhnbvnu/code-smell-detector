function guessesForUserOffsets (offsets) {
        var offsetsLength = offsets.length,
            filteredGuesses = {},
            out = [],
            i, j, guessesOffset;

        for (i = 0; i < offsetsLength; i++) {
            guessesOffset = guesses[offsets[i].offset] || {};
            for (j in guessesOffset) {
                if (guessesOffset.hasOwnProperty(j)) {
                    filteredGuesses[j] = true;
                }
            }
        }

        for (i in filteredGuesses) {
            if (filteredGuesses.hasOwnProperty(i)) {
                out.push(names[i]);
            }
        }

        return out;
    }