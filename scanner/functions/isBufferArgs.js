function isBufferArgs(x) {
            return Array.isArray(x) ||
                isTypedArray(x) ||
                isNDArrayLike(x);
        }