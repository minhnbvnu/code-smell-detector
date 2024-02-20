function addHeder(header) {
        if (isFunction(_config.transformHeader))
          header = _config.transformHeader(header);
        _fields.push(header);
      }