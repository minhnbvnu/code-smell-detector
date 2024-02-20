function loadAudio(url) {
  return new Promise((resolve, reject) => {
    let _url = url,
      audioEl,
      canPlay,
      resolvedUrl,
      fullUrl;

    audioEl = new Audio();
    canPlay = getCanPlay(audioEl);

    // determine the first audio format the browser can play
    url = []
      .concat(url)
      .reduce(
        (playableSource, source) =>
          playableSource
            ? playableSource
            : canPlay[getExtension(source)]
            ? source
            : null,
        0
      ); // 0 is the shortest falsy value

    if (!url) {
      return reject(
        /* @ifdef DEBUG */ 'cannot play any of the audio formats provided ' +
          /* @endif */ _url
      );
    }

    resolvedUrl = joinPath(audioPath, url);
    if (audioAssets[resolvedUrl])
      return resolve(audioAssets[resolvedUrl]);

    audioEl.addEventListener('canplay', function loadAudioOnLoad() {
      fullUrl = getUrl(resolvedUrl, window.location.href);
      audioAssets[getName(url)] =
        audioAssets[resolvedUrl] =
        audioAssets[fullUrl] =
          this;
      emit('assetLoaded', this, url);
      resolve(this);
    });

    audioEl.onerror = function loadAudioOnError() {
      reject(
        /* @ifdef DEBUG */ 'Unable to load audio ' +
          /* @endif */ resolvedUrl
      );
    };

    audioEl.src = resolvedUrl;
    audioEl.load();
  });
}