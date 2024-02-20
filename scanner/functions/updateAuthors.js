function updateAuthors(cb) {
      try {
        exec('./authors.sh', function (err, stdout, stderr) {
          if (err || stderr) {
            console.error('./authors.sh stderr:', err, stderr);
          }
        });
      }
      catch (e) {
        console.error('./authors.sh exception:' + e);
      }
      cb();
    }