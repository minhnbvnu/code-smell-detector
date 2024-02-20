function mergeInferences(target, source) {
                for (let i = 0; i < target.length; i++) {
                    if (!hasInferenceCandidates(target[i]) && hasInferenceCandidates(source[i])) {
                        target[i] = source[i];
                    }
                }
            }