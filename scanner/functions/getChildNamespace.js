function getChildNamespace(parentNamespace, type) {
            if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
              return getIntrinsicNamespace(type);
            }
            if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") {
              return HTML_NAMESPACE;
            }
            return parentNamespace;
          }