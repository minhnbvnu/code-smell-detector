function drawFrame(frameNumber, frameCallback) {

    var canvas = canvases.pop(),
        context = canvas.getContext("2d");

    renderer.drawFrame(context, {
      caption: options.caption,
      waveform: options.waveform[frameNumber],
      frame: frameNumber
    });

    canvas.toBuffer(function(err, buf){

      if (err) {
        return cb(err);
      }

      fs.writeFile(path.join(options.frameDir, zeropad(frameNumber + 1, 6) + ".png"), buf, function(writeErr) {

        if (writeErr) {
          return frameCallback(writeErr);
        }

        if (options.tick) {
          options.tick();
        }

        canvases.push(canvas);

        return frameCallback(null);

      });

    });

  }