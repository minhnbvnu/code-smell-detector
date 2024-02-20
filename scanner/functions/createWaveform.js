function createWaveform(fileName, localFilePath, callback){
  var filePathImage = localFilePath + "-" + (new Date().getTime()) + ".png";

  getDuration(localFilePath, function(duration){
    var totalTime = duration || 1.0;
    var pixelsPerSecond = 256.0;
    do {
      var targetWidth = parseInt(pixelsPerSecond*totalTime, 10);
      if (targetWidth>2048) pixelsPerSecond/=2.0;
    } while (targetWidth>2048 && pixelsPerSecond>1);

    exec.execFile("audiowaveform",
      [
        "-w",
        ""+targetWidth,
        "--pixels-per-second",
        ""+parseInt(pixelsPerSecond),
        "--background-color", "ffffff00",
        "--border-color", "ffffff",
        "--waveform-color", "3498db",
        "--no-axis-labels",
        "-i", localFilePath, "-o", filePathImage
      ],
    {}, function(error, stdout, stderr) {
      if (!error) {
        callback(null, filePathImage);
      } else {
        console.log("error:", stdout, stderr);
        callback(error, null);
      }
    });
  });
}