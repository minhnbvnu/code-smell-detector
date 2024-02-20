function removeWebKitStyles(editor, content, internal, isWordHtml) {
      if (isWordHtml || internal) {
        return content;
      }
      var webKitStylesSetting = getWebkitStyles(editor);
      var webKitStyles;
      if (shouldRemoveWebKitStyles(editor) === false || webKitStylesSetting === 'all') {
        return content;
      }
      if (webKitStylesSetting) {
        webKitStyles = webKitStylesSetting.split(/[, ]/);
      }
      if (webKitStyles) {
        var dom_1 = editor.dom, node_1 = editor.selection.getNode();
        content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, function (all, before, value, after) {
          var inputStyles = dom_1.parseStyle(dom_1.decode(value));
          var outputStyles = {};
          if (webKitStyles === 'none') {
            return before + after;
          }
          for (var i = 0; i < webKitStyles.length; i++) {
            var inputValue = inputStyles[webKitStyles[i]], currentValue = dom_1.getStyle(node_1, webKitStyles[i], true);
            if (/color/.test(webKitStyles[i])) {
              inputValue = dom_1.toHex(inputValue);
              currentValue = dom_1.toHex(currentValue);
            }
            if (currentValue !== inputValue) {
              outputStyles[webKitStyles[i]] = inputValue;
            }
          }
          outputStyles = dom_1.serializeStyle(outputStyles, 'span');
          if (outputStyles) {
            return before + ' style="' + outputStyles + '"' + after;
          }
          return before + after;
        });
      } else {
        content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, '$1$3');
      }
      content = content.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi, function (all, before, value, after) {
        return before + ' style="' + value + '"' + after;
      });
      return content;
    }