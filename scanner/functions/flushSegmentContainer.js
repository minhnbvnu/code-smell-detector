function flushSegmentContainer(request, destination, segment) {
              writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
              flushSegment(request, destination, segment);
              return writeEndSegment(destination, segment.formatContext);
            }