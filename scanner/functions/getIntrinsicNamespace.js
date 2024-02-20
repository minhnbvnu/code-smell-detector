function getIntrinsicNamespace(type) {
            switch (type) {
              case "svg":
                return SVG_NAMESPACE;
              case "math":
                return MATH_NAMESPACE;
              default:
                return HTML_NAMESPACE;
            }
          }