function resizeAndUpload(a, size, max, fileName, localFilePath, callback) {
  if (max>320 || size.width > max || size.height > max) {
    var resizedFileName = max + "_"+fileName;
    var s3Key = "s"+ a.space_id.toString() + "/a" + a._id.toString() + "/" + resizedFileName;
    var localResizedFilePath = os.tmpdir()+"/"+resizedFileName;
    gm(localFilePath).resize(max, max).autoOrient().write(localResizedFilePath, function (err) {
      if(!err) {
        uploader.uploadFile(s3Key, "image/jpeg", localResizedFilePath, function(err, url) {
          if (err) callback(err);
          else{
            fs.unlink(localResizedFilePath, function (err) {
              if (err) {
                console.error(err);
                callback(null, url);
              }
              else callback(null, url);
            });
          }
        });
      } else {
        console.error(err);
        callback(err);
      }
    });
  } else {
    callback(null, "");
  }
}