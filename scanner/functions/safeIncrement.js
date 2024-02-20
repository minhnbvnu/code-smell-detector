function safeIncrement(value, increment) {
                    // Avoid floating point variance by dropping the smallest decimal places.
                    return Number((value + increment).toFixed(7));
                }