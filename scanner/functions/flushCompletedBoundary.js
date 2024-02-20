function flushCompletedBoundary(request, destination, boundary) {
              var completedSegments = boundary.completedSegments;
              var i = 0;
              for (; i < completedSegments.length; i++) {
                var segment = completedSegments[i];
                flushPartiallyCompletedSegment(request, destination, boundary, segment);
              }
              completedSegments.length = 0;
              return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
            }