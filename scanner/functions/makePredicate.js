function makePredicate(words) {
            if (!Array.isArray(words))
                words = words.split(" ");
            return new Set(words.sort());
        }