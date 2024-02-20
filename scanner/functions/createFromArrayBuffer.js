function createFromArrayBuffer(audioContext, audioData, options, callback) {
  // The following function is a workaround for a Webkit bug where decodeAudioData
  // invokes the errorCallback with null instead of a DOMException.
  // See https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-decodeaudiodata
  // and http://stackoverflow.com/q/10365335/103396

  function errorCallback(error) {
    if (!error) {
      error = new DOMException("EncodingError");
    }

    callback(error);
    // prevent double-calling the callback on errors:
    callback = function() { };
  }

  var promise = audioContext.decodeAudioData(
    audioData,
    function(audio_buffer) {
      createFromAudioBuffer(audio_buffer, options, callback);
    },
    errorCallback
  );

  if (promise) {
    promise.catch(errorCallback);
  }
}