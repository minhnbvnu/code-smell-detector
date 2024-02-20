function createRootFormatContext(namespaceURI) {
              var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
              return createFormatContext(insertionMode, null);
            }