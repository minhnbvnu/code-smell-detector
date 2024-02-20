function _getMission (decode) {
    if (decode === false) return _apiCall('get', 'mssn');
    let notReadMsgs = {
      0: 'Ready',
      1: 'Near a cliff',
      2: 'Both wheels dropped',
      3: 'Left wheel dropped',
      4: 'Right wheel dropped',
      7: 'Bin missing'
    };

    return _apiCall('get', 'mssn').then(function (resp) {
      if ('ok' in resp) resp.ok.missionFlags = decodeMissionFlags(resp.ok.flags);
      if ('ok' in resp) resp.ok.notReadyMsg = notReadMsgs[resp.ok.notReady] || 'Unknown';
      return resp;
    });
  }