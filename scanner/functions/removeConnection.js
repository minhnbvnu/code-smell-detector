function removeConnection(prevSegments, nextSegments) {
        for (let i = 0; i < prevSegments.length; ++i) {
            const prevSegment = prevSegments[i];
            const nextSegment = nextSegments[i];
            remove(prevSegment.nextSegments, nextSegment);
            remove(prevSegment.allNextSegments, nextSegment);
            remove(nextSegment.prevSegments, prevSegment);
            remove(nextSegment.allPrevSegments, prevSegment);
        }
    }