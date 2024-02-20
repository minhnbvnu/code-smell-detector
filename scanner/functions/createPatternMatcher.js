function createPatternMatcher(pattern) {
            const stringToWordSpans = /* @__PURE__ */ new Map();
            const dotSeparatedSegments = pattern.trim().split(".").map((p) => createSegment(p.trim()));
            if (dotSeparatedSegments.some((segment) => !segment.subWordTextChunks.length))
                return void 0;
            return {
                getFullMatch: (containers, candidate) => getFullMatch(containers, candidate, dotSeparatedSegments, stringToWordSpans),
                getMatchForLastSegmentOfPattern: (candidate) => matchSegment(candidate, last(dotSeparatedSegments), stringToWordSpans),
                patternContainsDots: dotSeparatedSegments.length > 1
            };
        }