function convertToFontFaces(fontMap) {
      var fontFaces = [];

      Object.keys(fontMap).forEach(function(family) {
        var styles = fontMap[family];

        styles.forEach(function(style) {
          var fontFace = null;

          switch (style) {
            case "bold":
              fontFace = {
                family: family,
                weight: "bold"
              };
              break;

            case "italic":
              fontFace = {
                family: family,
                style: "italic"
              };
              break;

            case "bolditalic":
              fontFace = {
                family: family,
                weight: "bold",
                style: "italic"
              };
              break;

            case "":
            case "normal":
              fontFace = {
                family: family
              };
              break;
          }

          // If font-face is still null here, it is a font with some styling we don't recognize and
          // cannot map or it is a font added via the fontFaces option of .html().
          if (fontFace !== null) {
            fontFace.ref = {
              name: family,
              style: style
            };

            fontFaces.push(fontFace);
          }
        });
      });

      return fontFaces;
    }