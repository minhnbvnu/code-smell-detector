function apiCall (command, value) {
    requestOptions.uri = `https://irobot.axeda.com/services/v1/rest/Scripto/execute/AspenApiRequest?blid=${user}&robotpwd=${password}&method=${command}`;
    if (value) {
      requestOptions.uri += '&value=%7B%0A%20%20%22remoteCommand%22%20:%20%22' + value + '%22%0A%7D';
    }

    return request(requestOptions).then(JSON.parse);
  }