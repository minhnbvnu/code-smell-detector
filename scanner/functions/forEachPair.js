function forEachPair(values, action) {
                for (let i = 0; i < values.length; i++) {
                    for (let j = i + 1; j < values.length; j++) {
                        action(values[i], values[j]);
                    }
                }
            }