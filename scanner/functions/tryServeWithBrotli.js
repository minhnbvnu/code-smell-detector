function tryServeWithBrotli(shouldTryGzip) {
      fs.stat(brotliFile, (err, stat) => {
        if (!err && stat.isFile()) {
          file = brotliFile;
          serve(stat);
        } else if (shouldTryGzip) {
          tryServeWithGzip();
        } else {
          statFile();
        }
      });
    }