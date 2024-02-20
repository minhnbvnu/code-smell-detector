function makeLooped(state, unflattenedFromSegments, unflattenedToSegments) {
        const fromSegments = CodePathSegment.flattenUnusedSegments(unflattenedFromSegments);
        const toSegments = CodePathSegment.flattenUnusedSegments(unflattenedToSegments);
        const end = Math.min(fromSegments.length, toSegments.length);
        for (let i = 0; i < end; ++i) {
            const fromSegment = fromSegments[i];
            const toSegment = toSegments[i];
            if (toSegment.reachable) {
                fromSegment.nextSegments.push(toSegment);
            }
            if (fromSegment.reachable) {
                toSegment.prevSegments.push(fromSegment);
            }
            fromSegment.allNextSegments.push(toSegment);
            toSegment.allPrevSegments.push(fromSegment);
            if (toSegment.allPrevSegments.length >= 2) {
                CodePathSegment.markPrevSegmentAsLooped(toSegment, fromSegment);
            }
            state.notifyLooped(fromSegment, toSegment);
        }
    }