function _onPlaybackStopped (context) {
  ScripterX.Log.Info('VERTEX PUSH SERVICE START PUSH JOB');
  const playbackInfo = {
    event: 'media.stop'
  };
  let keys = [
    '%item.id%', '%item.name%', '%item.path%', '%item.originaltitle%',
    '%item.tagline%', '%item.overview%', '%item.type%',
    '%item.productionyear%', '%item.isvirtual%', '%item.meta.tmdb%',
    '%item.library.type%', '%item.library.name%', '%user.id%',
    '%username%', '%device.id%', '%device.name%', '%server.id%', '%server.name%'
  ];
  const seriesKeys = [
    '%season.id%', '%season.name%', '%season.number%', '%series.id%',
    '%series.name%', '%series.meta.tmdb%', '%episode.number%'
  ];
  if (context.Token('%item.type%').value === 'Episode') {
    keys = keys.concat(seriesKeys);
  }
  try {
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      ScripterX.Log.Info('VERTEX PUSH SERVICE ADD MATA KEY: ' + k);
      const kk = k.replace(/%/g, '').replace(/\./g, '_');
      playbackInfo[kk] = context.Token(k).value;
    }
  } catch (e) {
    ScripterX.Log.Info('VERTEX PUSH SERVICE ERROR');
  }
  ScripterX.Log.Info('VERTEX PUSH SERVICE JSON:' + JSON.stringify(playbackInfo, null, 2));
  ScripterX.Web.Post(VERTEX_OPENAPI_URL, JSON.stringify(playbackInfo));
}