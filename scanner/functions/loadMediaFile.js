function loadMediaFile(track, priority = LOAD_STYLE.NONE, atIndex = 0) {
  return dispatch => {
    const id = uniqueId();
    const {
      defaultName,
      metaData,
      duration
    } = track;
    let canonicalUrl;

    if ("url" in track) {
      canonicalUrl = track.url.toString();
    } else if ("blob" in track) {
      canonicalUrl = URL.createObjectURL(track.blob);
    } else {
      throw new Error("Expected track to have either a blob or a url");
    }

    dispatch({
      type: ADD_TRACK_FROM_URL,
      url: canonicalUrl,
      duration: track.duration,
      defaultName,
      id,
      atIndex
    });

    switch (priority) {
      case LOAD_STYLE.BUFFER:
        dispatch({
          type: BUFFER_TRACK,
          id
        });
        break;

      case LOAD_STYLE.PLAY:
        dispatch({
          type: PLAY_TRACK,
          id
        });
        break;

      case LOAD_STYLE.NONE:
      default:
        // If we're not going to load this right away,
        // we should set duration on our own
        if (duration != null) {
          dispatch({
            type: SET_MEDIA_DURATION,
            duration,
            id
          });
        } else {
          dispatch(fetchMediaDuration(canonicalUrl, id));
        }

    }

    if (metaData != null) {
      const {
        artist,
        title,
        album
      } = metaData;
      dispatch({
        type: SET_MEDIA_TAGS,
        artist,
        title,
        album,
        // For now, we lie about these next three things.
        // TODO: Ideally we would leave these as null and force a media data
        // fetch when the user starts playing.
        sampleRate: 44000,
        bitrate: 192000,
        numberOfChannels: 2,
        id
      });
    } else if ("blob" in track) {
      // Blobs can be loaded quickly
      dispatch(fetchMediaTags(track.blob, id));
    } else {
      dispatch(queueFetchingMediaTags(id));
    }
  };
}