function getDocumentSize(doc) {
      var max = Math.max;
      var documentElement = doc.documentElement;
      var body = doc.body;
      var scrollWidth = max(documentElement.scrollWidth, body.scrollWidth);
      var clientWidth = max(documentElement.clientWidth, body.clientWidth);
      var offsetWidth = max(documentElement.offsetWidth, body.offsetWidth);
      var scrollHeight = max(documentElement.scrollHeight, body.scrollHeight);
      var clientHeight = max(documentElement.clientHeight, body.clientHeight);
      var offsetHeight = max(documentElement.offsetHeight, body.offsetHeight);
      return {
        width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
        height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
      };
    }