function guess (ignoreCache) {
        if (!cachedGuess || ignoreCache) {
            cachedGuess = rebuildGuess();
        }
        return cachedGuess;
    }