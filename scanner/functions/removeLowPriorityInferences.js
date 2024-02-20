function removeLowPriorityInferences(inferences, priorities) {
                const toRemove = [];
                for (const i of inferences) {
                    for (const { high, low } of priorities) {
                        if (high(i)) {
                            Debug.assert(!low(i), "Priority can't have both low and high");
                            toRemove.push(low);
                        }
                    }
                }
                return inferences.filter((i) => toRemove.every((f) => !f(i)));
            }