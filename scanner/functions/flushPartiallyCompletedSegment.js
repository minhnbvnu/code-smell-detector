function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
              if (segment.status === FLUSHED) {
                return true;
              }
              var segmentID = segment.id;
              if (segmentID === -1) {
                var rootSegmentID = segment.id = boundary.rootSegmentID;
                if (rootSegmentID === -1) {
                  throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
                }
                return flushSegmentContainer(request, destination, segment);
              } else {
                flushSegmentContainer(request, destination, segment);
                return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
              }
            }