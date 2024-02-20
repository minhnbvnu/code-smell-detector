function parseMatchProps(propsToMatchStr) {
        var PROPS_DIVIDER = " ";
        var PAIRS_MARKER = ":";
        var isRequestProp = function isRequestProp(prop) {
          return getRequestProps().includes(prop);
        };
        var propsObj = {};
        var props = propsToMatchStr.split(PROPS_DIVIDER);
        props.forEach(function (prop) {
          var dividerInd = prop.indexOf(PAIRS_MARKER);
          var key = prop.slice(0, dividerInd);
          if (isRequestProp(key)) {
            var value = prop.slice(dividerInd + 1);
            propsObj[key] = value;
          } else {
            propsObj.url = prop;
          }
        });
        return propsObj;
      }