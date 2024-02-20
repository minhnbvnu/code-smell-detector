function _setPreferences (and, or) {
    return _apiCall('get', 'prefs').then(function (resp) {
      if (and) resp.ok.flags = resp.ok.flags & and;
      if (or) resp.ok.flags = resp.ok.flags | or;
      return _apiCall('set', 'prefs', resp.ok);
    });
  }