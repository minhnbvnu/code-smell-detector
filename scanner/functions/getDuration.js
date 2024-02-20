function getDuration(localFilePath, callback){
  exec.execFile("ffprobe", ["-show_format", "-of", "json", localFilePath], function(error, stdout, stderr) {
    var test = JSON.parse(stdout);
    callback(parseFloat(test.format.duration));
  });
}