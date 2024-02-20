function getChildFormatContext(parentContext, type, props) {
              switch (type) {
                case "select":
                  return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
                case "svg":
                  return createFormatContext(SVG_MODE, null);
                case "math":
                  return createFormatContext(MATHML_MODE, null);
                case "foreignObject":
                  return createFormatContext(HTML_MODE, null);
                case "table":
                  return createFormatContext(HTML_TABLE_MODE, null);
                case "thead":
                case "tbody":
                case "tfoot":
                  return createFormatContext(HTML_TABLE_BODY_MODE, null);
                case "colgroup":
                  return createFormatContext(HTML_COLGROUP_MODE, null);
                case "tr":
                  return createFormatContext(HTML_TABLE_ROW_MODE, null);
              }
              if (parentContext.insertionMode >= HTML_TABLE_MODE) {
                return createFormatContext(HTML_MODE, null);
              }
              if (parentContext.insertionMode === ROOT_HTML_MODE) {
                return createFormatContext(HTML_MODE, null);
              }
              return parentContext;
            }