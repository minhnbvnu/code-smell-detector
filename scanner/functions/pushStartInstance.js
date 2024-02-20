function pushStartInstance(target, type, props, responseState, formatContext) {
              {
                validateProperties(type, props);
                validateProperties$1(type, props);
                validateProperties$2(type, props, null);
                if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                  error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
                }
                if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
                  if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                    error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
                  }
                }
              }
              switch (type) {
                case "select":
                  return pushStartSelect(target, props, responseState);
                case "option":
                  return pushStartOption(target, props, responseState, formatContext);
                case "textarea":
                  return pushStartTextArea(target, props, responseState);
                case "input":
                  return pushInput(target, props, responseState);
                case "menuitem":
                  return pushStartMenuItem(target, props, responseState);
                case "title":
                  return pushStartTitle(target, props, responseState);
                case "listing":
                case "pre": {
                  return pushStartPreformattedElement(target, props, type, responseState);
                }
                case "area":
                case "base":
                case "br":
                case "col":
                case "embed":
                case "hr":
                case "img":
                case "keygen":
                case "link":
                case "meta":
                case "param":
                case "source":
                case "track":
                case "wbr": {
                  return pushSelfClosing(target, props, type, responseState);
                }
                case "annotation-xml":
                case "color-profile":
                case "font-face":
                case "font-face-src":
                case "font-face-uri":
                case "font-face-format":
                case "font-face-name":
                case "missing-glyph": {
                  return pushStartGenericElement(target, props, type, responseState);
                }
                case "html": {
                  if (formatContext.insertionMode === ROOT_HTML_MODE) {
                    target.push(DOCTYPE);
                  }
                  return pushStartGenericElement(target, props, type, responseState);
                }
                default: {
                  if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                    return pushStartGenericElement(target, props, type, responseState);
                  } else {
                    return pushStartCustomElement(target, props, type, responseState);
                  }
                }
              }
            }