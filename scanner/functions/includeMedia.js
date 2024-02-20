function includeMedia(media) {
    return (
      includeByMedium.all ||
      media.some((medium) => {
        medium = medium.replace(/^\s+|\s+$/g, '');
        return medium === 'all' || includeByMedium[medium];
      })
    );
  }