function getUselessReturns(uselessReturns, prevSegments, providedTraversedSegments) {
                const traversedSegments = providedTraversedSegments || new WeakSet();
                for (const segment of prevSegments) {
                    if (!segment.reachable) {
                        if (!traversedSegments.has(segment)) {
                            traversedSegments.add(segment);
                            getUselessReturns(uselessReturns, segment.allPrevSegments.filter(isReturned), traversedSegments);
                        }
                        continue;
                    }
                    uselessReturns.push(...segmentInfoMap.get(segment).uselessReturns);
                }
                return uselessReturns;
            }