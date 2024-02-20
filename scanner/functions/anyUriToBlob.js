function anyUriToBlob(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new domGlobals.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            resolve(this.response);
          }
        };
        xhr.onerror = function () {
          var _this = this;
          var corsError = function () {
            var obj = new Error('No access to download image');
            obj.code = 18;
            obj.name = 'SecurityError';
            return obj;
          };
          var genericError = function () {
            return new Error('Error ' + _this.status + ' downloading image');
          };
          reject(this.status === 0 ? corsError() : genericError());
        };
        xhr.send();
      });
    }