function checkFrame(test, options) {

  var testCanvas = new Canvas(options.width, options.height),
      context = testCanvas.getContext("2d");

  d3.queue()
    .defer(fs.readFile, path.join(frameDir, "000001.png"))
    .defer(fs.readFile, path.join(frameDir, "000002.png"))
    .await(function(e, f1, f2){

      test.error(e);

      var img = new Canvas.Image;
      img.src = f1;

      var bg = getColor(options.backgroundColor || "#fff"),
          fg = getColor(options.waveColor || options.foregroundColor || "#000");

      context.drawImage(img, 0, 0, options.width, options.height);
      test.deepEqual(getColor(context.getImageData(0, 0, 1, 1)), bg);
      test.deepEqual(getColor(context.getImageData(options.width - 1, options.height - 1, 1, 1)), bg);
      test.deepEqual(getColor(context.getImageData(0, options.height / 2 - 10, 1, 1)), bg);
      test.deepEqual(getColor(context.getImageData(options.width - 1, options.height / 2 + 10, 1, 1)), bg);
      test.deepEqual(getColor(context.getImageData(options.width / 2, options.height / 2, 1, 1)), fg);
      test.deepEqual(getColor(context.getImageData(options.width / 2, options.height / 2 - 10, 1, 1)), fg);
      test.deepEqual(getColor(context.getImageData(options.width / 2, options.height / 2 + 10, 1, 1)), fg);

      img.src = f2;

      context.drawImage(img, 10, 0, options.width, options.height);
      test.deepEqual(getColor(context.getImageData(options.width / 2, options.height / 2, 1, 1)), fg);
      test.deepEqual(getColor(context.getImageData(options.width / 2 - 10, options.height / 2 - 10, 1, 1)), bg);
      test.deepEqual(getColor(context.getImageData(options.width / 2 - 10, options.height / 2 + 10, 1, 1)), bg);


      test.end();

    });

}