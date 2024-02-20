function tester(options) {

  return function(test) {

    initializeCanvas(options, function(err, renderer){

      test.error(err);

      drawFrames(renderer, {
        numFrames: waveform.length,
        frameDir: frameDir,
        width: options.width,
        height: options.height,
        waveform: waveform
      }, function(err){
        test.error(err);
        checkFrame(test, options);
      });

    });

  };

}