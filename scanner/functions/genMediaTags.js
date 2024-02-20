function genMediaTags(file, musicMetadata) {
  browser_default()(file != null, "Attempted to get the tags of media file without passing a file");
  const options = {
    duration: true,
    skipPostHeaders: true // avoid unnecessary data to be read

  };

  if (typeof file === "string") {
    return musicMetadata.fetchFromUrl(file, options);
  } // Assume Blob


  return musicMetadata.parseBlob(file, options);
}