function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
            var ret = "<" + tagVerbatim;
            var isCustomComponent$1 = isCustomComponent(tagLowercase, props);
            for (var propKey in props) {
              if (!hasOwnProperty$2.call(props, propKey)) {
                continue;
              }
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              if (propKey === STYLE) {
                propValue = createMarkupForStyles(propValue);
              }
              var markup = null;
              if (isCustomComponent$1) {
                if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
                  markup = createMarkupForCustomAttribute(propKey, propValue);
                }
              } else {
                markup = createMarkupForProperty(propKey, propValue);
              }
              if (markup) {
                ret += " " + markup;
              }
            }
            if (makeStaticMarkup) {
              return ret;
            }
            if (isRootElement) {
              ret += " " + createMarkupForRoot();
            }
            return ret;
          }