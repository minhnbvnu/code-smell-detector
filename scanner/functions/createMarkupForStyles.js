function createMarkupForStyles(styles) {
            var serialized = "";
            var delimiter = "";
            for (var styleName in styles) {
              if (!styles.hasOwnProperty(styleName)) {
                continue;
              }
              var isCustomProperty = styleName.indexOf("--") === 0;
              var styleValue = styles[styleName];
              {
                if (!isCustomProperty) {
                  warnValidStyle$1(styleName, styleValue);
                }
              }
              if (styleValue != null) {
                serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":";
                serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
                delimiter = ";";
              }
            }
            return serialized || null;
          }