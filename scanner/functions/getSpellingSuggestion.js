function getSpellingSuggestion(name, candidates, getName) {
            const maximumLengthDifference = Math.max(2, Math.floor(name.length * 0.34));
            let bestDistance = Math.floor(name.length * 0.4) + 1;
            let bestCandidate;
            for (const candidate of candidates) {
                const candidateName = getName(candidate);
                if (candidateName !== void 0 && Math.abs(candidateName.length - name.length) <= maximumLengthDifference) {
                    if (candidateName === name) {
                        continue;
                    }
                    if (candidateName.length < 3 && candidateName.toLowerCase() !== name.toLowerCase()) {
                        continue;
                    }
                    const distance = levenshteinWithMax(name, candidateName, bestDistance - 0.1);
                    if (distance === void 0) {
                        continue;
                    }
                    Debug.assert(distance < bestDistance);
                    bestDistance = distance;
                    bestCandidate = candidate;
                }
            }
            return bestCandidate;
        }