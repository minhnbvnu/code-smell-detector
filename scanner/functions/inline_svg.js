function inline_svg(img, callback) {
        var source = img.attr('src');
        var imgId  = img.attr('id');
        var klass  = img.attr('class');

        $.get(source, function( data ) {
          var svg = $(data).find('svg');
          svg.attr('id', imgId);
          svg.attr('class', klass);

          if (typeof callback === 'function') {
            callback.call(svg);
          }

          img.replaceWith(svg);
          console.log( "Inlined SVG image: " + source);
        });

      }