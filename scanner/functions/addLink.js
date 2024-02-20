function addLink(url, text) {
      var key;
      html.push('<a ');
      if (angular.isFunction(attributes)) {
        attributes = attributes(url);
      }
      if (angular.isObject(attributes)) {
        for (key in attributes) {
          html.push(key + '="' + attributes[key] + '" ');
        }
      } else {
        attributes = {};
      }
      if (angular.isDefined(target) && !('target' in attributes)) {
        html.push('target="',
                  target,
                  '" ');
      }
      html.push('href="',
                url.replace(/"/g, '&quot;'),
                '">');
      addText(text);
      html.push('</a>');
    }