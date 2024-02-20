function convertAudio(fileName, filePath, codec, callback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  var newExt = codec == "mp3" ? "mp3" : "ogg";
  var convertedPath = filePath + "." + newExt;

  console.log("converting audio", filePath, "to", convertedPath);

  var convertArgs = (ext == ".aac") ? [ "-i", filePath, "-y", convertedPath ]
  : [ "-i", filePath,
    "-b:a", "128k",
    "-y", convertedPath];

  exec.execFile("ffmpeg", convertArgs , {}, function(error, stdout, stderr) {
    if(!error){
      console.log("converted", filePath, "to", convertedPath);
      callback(null, convertedPath);
    }else{
      console.log(error,stdout, stderr);
      callback(error, null);
    }
  });
}