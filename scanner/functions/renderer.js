function renderer(options) {
      return function() {
        var root = document.createElement("div");
        katex.render(raw.apply(String, arguments), root, options);
        return root.removeChild(root.firstChild);
      };
    }