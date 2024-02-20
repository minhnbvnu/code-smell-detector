function renderToString2(element, options) {
            var renderer = new ReactDOMServerRenderer(element, false, options);
            try {
              var markup = renderer.read(Infinity);
              return markup;
            } finally {
              renderer.destroy();
            }
          }