function isVisited(prevSegment) {
                return (visited[prevSegment.id] ||
                    segment.isLoopedPrevSegment(prevSegment));
            }