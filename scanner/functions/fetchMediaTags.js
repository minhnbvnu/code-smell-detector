function fetchMediaTags(file, id) {
  return async (dispatch, getState, {
    requireMusicMetadata
  }) => {
    dispatch({
      type: MEDIA_TAG_REQUEST_INITIALIZED,
      id
    });

    try {
      const metadata = await genMediaTags(file, await requireMusicMetadata()); // There's more data here, but we don't have a use for it yet:

      const {
        artist,
        title,
        album,
        picture
      } = metadata.common;
      const {
        numberOfChannels,
        bitrate,
        sampleRate
      } = metadata.format;
      let albumArtUrl = null;

      if (picture && picture.length >= 1) {
        const byteArray = new Uint8Array(picture[0].data);
        const blob = new Blob([byteArray], {
          type: picture[0].format
        });
        albumArtUrl = URL.createObjectURL(blob);
      }

      dispatch({
        type: SET_MEDIA_TAGS,
        artist: artist ? artist : "",
        title: title ? title : "",
        album,
        albumArtUrl,
        numberOfChannels,
        bitrate,
        sampleRate,
        id
      });
    } catch (e) {
      dispatch({
        type: MEDIA_TAG_REQUEST_FAILED,
        id
      });
    }
  };
}