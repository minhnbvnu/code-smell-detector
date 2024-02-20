function isCalledInEveryPath(segment) {
                /*
                 * If specific segment is the looped segment of the current segment,
                 * skip the segment.
                 * If not skipped, this never becomes true after a loop.
                 */
                if (segment.nextSegments.length === 1 &&
                    segment.nextSegments[0].isLoopedPrevSegment(segment)) {
                    return true;
                }
                return segment.reachable && segInfoMap[segment.id].calledInEveryPaths;
            }