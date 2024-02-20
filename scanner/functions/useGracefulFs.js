function useGracefulFs() {
  var fs = require('fs');
  var gracefulFs = require('graceful-fs');
  gracefulFs.gracefulify(fs);
}