function flushPartialBoundary(request, destination, boundary) {
              var completedSegments = boundary.completedSegments;
              var i = 0;
              for (; i < completedSegments.length; i++) {
                var segment = completedSegments[i];
                if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
                  i++;
                  completedSegments.splice(0, i);
                  return false;
                }
              }
              completedSegments.splice(0, i);
              return true;
            }