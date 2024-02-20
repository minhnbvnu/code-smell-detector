function genMediaDuration(url) {
  browser_default()(typeof url === "string", "Attempted to get the duration of media file without passing a url");
  return new Promise((resolve, reject) => {
    // TODO: Does this actually stop downloading the file once it's
    // got the duration?
    const audio = document.createElement("audio");
    audio.crossOrigin = "anonymous";

    const durationChange = () => {
      resolve(audio.duration);
      audio.removeEventListener("durationchange", durationChange);
      audio.src = ""; // TODO: Not sure if this really gets cleaned up.
    };

    audio.addEventListener("durationchange", durationChange);
    audio.addEventListener("error", e => {
      reject(e);
    });
    audio.src = url;
  });
}