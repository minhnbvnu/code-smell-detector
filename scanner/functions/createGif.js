function createGif(files, w, h) {

      var cv = document.getElementById("canvas");
      var ctx = cv.getContext("2d");
      var pixels = new Uint8Array(w * h);
      var totalImages = files.length;
      var processedImages = 0;

      cv.width = w;
      cv.height = h;

      var rs = new ReadableStream({
        // Each time pull gets called you should get the pixel data and
        // enqueue it as if it would be good old gif.addFrame()
        pull: function pull(controller) {
          var frame = files.shift();
          if (!frame) {
            controller.close();
            return;
          }

          return $http({
              url: frame,
              responseType: "blob"
            })
            .then(function (res) {

              return res.data.image();
            })
            .then(function (img) {
              processedImages++;

              var p = Math.round(processedImages / totalImages * 100);
              $ionicLoading.show({
                template: $translate.instant('kPleaseWait') + "...(" + p + "%)",
                noBackdrop: true
              });

              // console.log("URL=" + frame);
              URL.revokeObjectURL(img.src);
              ctx.drawImage(img, 0, 0);

              var data = ctx.getImageData(0, 0, w, h).data;
              var rgbComponents = dataToRGB(data, w, h);
              var nq = new NeuQuant(rgbComponents, rgbComponents.length, 15);
              var paletteRGB = nq.process();
              var paletteArray = new Uint32Array(componentizedPaletteToArray(paletteRGB));
              var numberPixels = w * h;
              var k = 0,
                i, r, g, b;

              for (i = 0; i < numberPixels; i++) {
                r = rgbComponents[k++];
                g = rgbComponents[k++];
                b = rgbComponents[k++];
                pixels[i] = nq.map(r, g, b);
              }

              controller.enqueue([0, 0, w, h, pixels,
                {
                  palette: paletteArray,
                  delay: 100, // 1 second
                }
              ]);
            });
        }
      });

      return new GifWriter(rs, w, h, {
        loop: null
      });
    }