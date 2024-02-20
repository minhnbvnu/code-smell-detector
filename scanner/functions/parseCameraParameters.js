function parseCameraParameters( xml ) {

      var data = {};

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        switch ( child.nodeName ) {

          case 'xfov':
          case 'yfov':
          case 'xmag':
          case 'ymag':
          case 'znear':
          case 'zfar':
          case 'aspect_ratio':
            data[ child.nodeName ] = parseFloat( child.textContent );
            break;

        }

      }

      return data;

    }