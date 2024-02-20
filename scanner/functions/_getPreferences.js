function _getPreferences (decode) {
    if (decode === false) return _apiCall('get', 'prefs');
    return _apiCall('get', 'prefs').then(function (resp) {
      if ('ok' in resp) resp.ok.cleaningPreferences = decodeCleaningPreferences(resp.ok.flags);
      return resp;
    });
  }