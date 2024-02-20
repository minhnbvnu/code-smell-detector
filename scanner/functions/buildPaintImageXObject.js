function buildPaintImageXObject(image, inline) {
        var dict = image.dict;
        var w = dict.get('Width', 'W');
        var h = dict.get('Height', 'H');

        var imageMask = dict.get('ImageMask', 'IM') || false;
        if (imageMask) {
          // This depends on a tmpCanvas beeing filled with the
          // current fillStyle, such that processing the pixel
          // data can't be done here. Instead of creating a
          // complete PDFImage, only read the information needed
          // for later.

          var width = dict.get('Width', 'W');
          var height = dict.get('Height', 'H');
          var bitStrideLength = (width + 7) >> 3;
          var imgArray = image.getBytes(bitStrideLength * height);
          var decode = dict.get('Decode', 'D');
          var inverseDecode = !!decode && decode[0] > 0;

          fn = 'paintImageMaskXObject';
          args = [imgArray, inverseDecode, width, height];
          return;
        }

        // If there is no imageMask, create the PDFImage and a lot
        // of image processing can be done here.
        var objId = 'img_' + uniquePrefix + (++self.objIdCounter);
        insertDependency([objId]);
        args = [objId, w, h];

        var softMask = dict.get('SMask', 'IM') || false;
        if (!softMask && image instanceof JpegStream &&
            image.isNativelySupported(xref, resources)) {
          // These JPEGs don't need any more processing so we can just send it.
          fn = 'paintJpegXObject';
          handler.send('obj', [objId, 'JpegStream', image.getIR()]);
          return;
        }

        fn = 'paintImageXObject';

        PDFImage.buildImage(function(imageObj) {
            var drawWidth = imageObj.drawWidth;
            var drawHeight = imageObj.drawHeight;
            var imgData = {
              width: drawWidth,
              height: drawHeight,
              data: new Uint8Array(drawWidth * drawHeight * 4)
            };
            var pixels = imgData.data;
            imageObj.fillRgbaBuffer(pixels, drawWidth, drawHeight);
            handler.send('obj', [objId, 'Image', imgData]);
          }, handler, xref, resources, image, inline);
      }