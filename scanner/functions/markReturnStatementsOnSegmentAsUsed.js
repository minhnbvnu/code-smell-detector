function markReturnStatementsOnSegmentAsUsed(segment) {
                if (!segment.reachable) {
                    usedUnreachableSegments.add(segment);
                    segment.allPrevSegments
                        .filter(isReturned)
                        .filter(prevSegment => !usedUnreachableSegments.has(prevSegment))
                        .forEach(markReturnStatementsOnSegmentAsUsed);
                    return;
                }
                const info = segmentInfoMap.get(segment);
                for (const node of info.uselessReturns) {
                    remove(scopeInfo.uselessReturns, node);
                }
                info.uselessReturns = [];
            }