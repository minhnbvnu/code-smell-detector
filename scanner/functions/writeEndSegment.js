function writeEndSegment(destination, formatContext) {
              switch (formatContext.insertionMode) {
                case ROOT_HTML_MODE:
                case HTML_MODE: {
                  return writeChunkAndReturn(destination, endSegmentHTML);
                }
                case SVG_MODE: {
                  return writeChunkAndReturn(destination, endSegmentSVG);
                }
                case MATHML_MODE: {
                  return writeChunkAndReturn(destination, endSegmentMathML);
                }
                case HTML_TABLE_MODE: {
                  return writeChunkAndReturn(destination, endSegmentTable);
                }
                case HTML_TABLE_BODY_MODE: {
                  return writeChunkAndReturn(destination, endSegmentTableBody);
                }
                case HTML_TABLE_ROW_MODE: {
                  return writeChunkAndReturn(destination, endSegmentTableRow);
                }
                case HTML_COLGROUP_MODE: {
                  return writeChunkAndReturn(destination, endSegmentColGroup);
                }
                default: {
                  throw new Error("Unknown insertion mode. This is a bug in React.");
                }
              }
            }