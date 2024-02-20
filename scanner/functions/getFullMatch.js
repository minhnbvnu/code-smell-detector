function getFullMatch(candidateContainers, candidate, dotSeparatedSegments, stringToWordSpans) {
            const candidateMatch = matchSegment(candidate, last(dotSeparatedSegments), stringToWordSpans);
            if (!candidateMatch) {
                return void 0;
            }
            if (dotSeparatedSegments.length - 1 > candidateContainers.length) {
                return void 0;
            }
            let bestMatch;
            for (let i = dotSeparatedSegments.length - 2, j = candidateContainers.length - 1; i >= 0; i -= 1, j -= 1) {
                bestMatch = betterMatch(bestMatch, matchSegment(candidateContainers[j], dotSeparatedSegments[i], stringToWordSpans));
            }
            return bestMatch;
        }