function matchSegment(candidate, segment, stringToWordSpans) {
            if (every2(segment.totalTextChunk.text, (ch) => ch !== 32 /* space */ && ch !== 42 /* asterisk */)) {
                const match = matchTextChunk(candidate, segment.totalTextChunk, stringToWordSpans);
                if (match)
                    return match;
            }
            const subWordTextChunks = segment.subWordTextChunks;
            let bestMatch;
            for (const subWordTextChunk of subWordTextChunks) {
                bestMatch = betterMatch(bestMatch, matchTextChunk(candidate, subWordTextChunk, stringToWordSpans));
            }
            return bestMatch;
        }