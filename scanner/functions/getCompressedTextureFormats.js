function getCompressedTextureFormats() {

    if (compressedTextureFormats === null) {

      compressedTextureFormats = [];

      if (extensions.get('WEBGL_compressed_texture_pvrtc') ||
        extensions.get('WEBGL_compressed_texture_s3tc') ||
        extensions.get('WEBGL_compressed_texture_etc1') ||
        extensions.get('WEBGL_compressed_texture_astc')) {

        var formats = gl.getParameter(34467);

        for (var i = 0; i < formats.length; i++) {

          compressedTextureFormats.push(formats[i]);

        }

      }

    }

    return compressedTextureFormats;

  }