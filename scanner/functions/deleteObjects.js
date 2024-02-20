function deleteObjects(objects, truncated, cb) {

    s3.deleteObjects({ Delete: { Objects: objects } }, function(err, data){

      if (err) {
        return cb(err);
      }

      if (truncated) {
        return clean(cb);
      }

      return cb(null);

    });

  }