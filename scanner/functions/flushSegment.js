function flushSegment(request, destination, segment) {
              var boundary = segment.boundary;
              if (boundary === null) {
                return flushSubtree(request, destination, segment);
              }
              boundary.parentFlushed = true;
              if (boundary.forceClientRender) {
                writeStartClientRenderedSuspenseBoundary(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
                flushSubtree(request, destination, segment);
                return writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
              } else if (boundary.pendingTasks > 0) {
                boundary.rootSegmentID = request.nextSegmentId++;
                if (boundary.completedSegments.length > 0) {
                  request.partialBoundaries.push(boundary);
                }
                var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
                writeStartPendingSuspenseBoundary(destination, request.responseState, id);
                flushSubtree(request, destination, segment);
                return writeEndPendingSuspenseBoundary(destination, request.responseState);
              } else if (boundary.byteSize > request.progressiveChunkSize) {
                boundary.rootSegmentID = request.nextSegmentId++;
                request.completedBoundaries.push(boundary);
                writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
                flushSubtree(request, destination, segment);
                return writeEndPendingSuspenseBoundary(destination, request.responseState);
              } else {
                writeStartCompletedSuspenseBoundary(destination, request.responseState);
                var completedSegments = boundary.completedSegments;
                if (completedSegments.length !== 1) {
                  throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
                }
                var contentSegment = completedSegments[0];
                flushSegment(request, destination, contentSegment);
                return writeEndCompletedSuspenseBoundary(destination, request.responseState);
              }
            }