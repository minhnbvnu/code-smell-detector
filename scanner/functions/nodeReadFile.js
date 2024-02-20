function nodeReadFile(url, sync, callback) {
    sync = sync === false ? false : true;
    var result = undefined;

    var fs = require("fs");
    var path = require("path");

    url = path.resolve(url);
    if (sync) {
      try {
        result = fs.readFileSync(url, { encoding: "latin1" });
      } catch (e) {
        return undefined;
      }
    } else {
      fs.readFile(url, { encoding: "latin1" }, function(err, data) {
        if (!callback) {
          return;
        }
        if (err) {
          callback(undefined);
        }
        callback(data);
      });
    }

    return result;
  }