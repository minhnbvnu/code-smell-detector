function fillHeaderFields() {
      if (!_results)
        return;
      function addHeder(header) {
        if (isFunction(_config.transformHeader))
          header = _config.transformHeader(header);
        _fields.push(header);
      }
      if (Array.isArray(_results.data[0])) {
        for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
          _results.data[i].forEach(addHeder);
        _results.data.splice(0, 1);
      } else
        _results.data.forEach(addHeder);
    }