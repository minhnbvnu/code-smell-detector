function flushSubtree(request, destination, segment) {
              segment.parentFlushed = true;
              switch (segment.status) {
                case PENDING: {
                  var segmentID = segment.id = request.nextSegmentId++;
                  segment.lastPushedText = false;
                  segment.textEmbedded = false;
                  return writePlaceholder(destination, request.responseState, segmentID);
                }
                case COMPLETED: {
                  segment.status = FLUSHED;
                  var r = true;
                  var chunks = segment.chunks;
                  var chunkIdx = 0;
                  var children = segment.children;
                  for (var childIdx = 0; childIdx < children.length; childIdx++) {
                    var nextChild = children[childIdx];
                    for (; chunkIdx < nextChild.index; chunkIdx++) {
                      writeChunk(destination, chunks[chunkIdx]);
                    }
                    r = flushSegment(request, destination, nextChild);
                  }
                  for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                    writeChunk(destination, chunks[chunkIdx]);
                  }
                  if (chunkIdx < chunks.length) {
                    r = writeChunkAndReturn(destination, chunks[chunkIdx]);
                  }
                  return r;
                }
                default: {
                  throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
                }
              }
            }