function maybeFixConfiguration(pcConfig) {
  if (!pcConfig) {
    return;
  }
  for (var i = 0; i < pcConfig.iceServers.length; i++) {
    if (pcConfig.iceServers[i].hasOwnProperty('urls')){
      pcConfig.iceServers[i]['url'] = pcConfig.iceServers[i]['urls'];
      delete pcConfig.iceServers[i]['urls'];
    }
  }
}