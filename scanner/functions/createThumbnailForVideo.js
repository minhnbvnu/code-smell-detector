function createThumbnailForVideo(fileName, filePath, callback) {
  var filePathImage = filePath + ".jpg";
  exec.execFile("ffmpeg", ["-y", "-i", filePath, "-ss", "00:00:01.00", "-vcodec", "mjpeg", "-vframes", "1", "-f", "image2", filePathImage], {}, function(error, stdout, stderr){
    if(!error){
      callback(null, filePathImage);
    }else{
      console.log("error:", stdout, stderr);
      callback(error, null);
    }
  });
}