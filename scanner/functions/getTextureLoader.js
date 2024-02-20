function getTextureLoader( image ) {

      var loader;

      var extension = image.slice( ( image.lastIndexOf( '.' ) - 1 >>> 0 ) + 2 ); // http://www.jstips.co/en/javascript/get-file-extension/
      extension = extension.toLowerCase();

      switch ( extension ) {

        case 'tga':
          loader = tgaLoader;
          break;

        default:
          loader = textureLoader;

      }

      return loader;

    }