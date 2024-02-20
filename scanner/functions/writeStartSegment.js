function writeStartSegment(destination, responseState, formatContext, id) {
              switch (formatContext.insertionMode) {
                case ROOT_HTML_MODE:
                case HTML_MODE: {
                  writeChunk(destination, startSegmentHTML);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentHTML2);
                }
                case SVG_MODE: {
                  writeChunk(destination, startSegmentSVG);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentSVG2);
                }
                case MATHML_MODE: {
                  writeChunk(destination, startSegmentMathML);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentMathML2);
                }
                case HTML_TABLE_MODE: {
                  writeChunk(destination, startSegmentTable);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentTable2);
                }
                case HTML_TABLE_BODY_MODE: {
                  writeChunk(destination, startSegmentTableBody);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentTableBody2);
                }
                case HTML_TABLE_ROW_MODE: {
                  writeChunk(destination, startSegmentTableRow);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentTableRow2);
                }
                case HTML_COLGROUP_MODE: {
                  writeChunk(destination, startSegmentColGroup);
                  writeChunk(destination, responseState.segmentPrefix);
                  writeChunk(destination, stringToChunk(id.toString(16)));
                  return writeChunkAndReturn(destination, startSegmentColGroup2);
                }
                default: {
                  throw new Error("Unknown insertion mode. This is a bug in React.");
                }
              }
            }