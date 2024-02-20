function convertVideo(fileName, filePath, codec, callback, progressCallback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  var newExt = codec == "mp4" ? "mp4" : "ogv";
  var convertedPath = filePath + "." + newExt;

  console.log("convertVideo", filePath, "to", convertedPath);

  var convertArgs = (codec == "mp4") ? [
    "-i", filePath,
    "-threads", "4",
    "-vf", "scale=1280:trunc(ow/a/2)*2", // scale to width of 1280, truncating height to an even value
    "-b:v", "2000k",
    "-acodec", "libvo_aacenc",
    "-b:a", "96k",
    "-vcodec", "libx264",
    "-y", convertedPath ]
  : [
    "-i", filePath,
    "-threads", "4",
    "-vf", "scale=1280:trunc(ow/a/2)*2", // scale to width of 1280, truncating height to an even value
    "-b:v", "2000k",
    "-acodec", "libvorbis",
    "-b:a", "96k",
    "-vcodec", "libtheora",
    "-y", convertedPath];

  var ff = exec.spawn('ffmpeg', convertArgs, {
    stdio: [
      'pipe', // use parents stdin for child
      'pipe', // pipe child's stdout to parent
      'pipe'
    ]
  });

  ff.stdout.on('data', function (data) {
    console.log('[ffmpeg-video] stdout: ' + data);
  });

  ff.stderr.on('data', function (data) {
    console.log('[ffmpeg-video] stderr: ' + data);
    if (progressCallback) {
      progressCallback(getConversionProgress(""+data)+"%");
    }
  });

  ff.on('close', function (code) {
    console.log('[ffmpeg-video] child process exited with code ' + code);
    if (!code) {
      console.log("converted", filePath, "to", convertedPath);
      callback(null, convertedPath);
    } else {
      callback(code, null);
    }
  });
}