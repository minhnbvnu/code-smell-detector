function builtInLoadZoneFile(fileName, opts) {
      var url = _this.zoneFileBasePath + '/' + fileName;
      return !opts || !opts.async
      ? _this.parseZones(_this.transport({ url : url, async : false }))
      : _this.transport({
        async: true,
        url : url,
        success : function (str) {
          if (_this.parseZones(str) && typeof opts.callback === 'function') {
            opts.callback();
          }
          return true;
        },
        error : function () {
          throw new Error('Error retrieving "' + url + '" zoneinfo files');
        }
      });
    }