function queueCompletedSegment(boundary, segment) {
              if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
                var childSegment = segment.children[0];
                childSegment.id = segment.id;
                childSegment.parentFlushed = true;
                if (childSegment.status === COMPLETED) {
                  queueCompletedSegment(boundary, childSegment);
                }
              } else {
                var completedSegments = boundary.completedSegments;
                completedSegments.push(segment);
              }
            }