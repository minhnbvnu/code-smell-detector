function convertToCamelCase(cssProperty) {
          if (!cssProperty.includes("-")) {
            return cssProperty;
          }
          var splittedProperty = cssProperty.split("-");
          var firstPart = splittedProperty[0];
          var secondPart = splittedProperty[1];
          return "".concat(firstPart).concat(secondPart[0].toUpperCase()).concat(secondPart.slice(1));
        }