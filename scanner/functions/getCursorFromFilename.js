async function getCursorFromFilename(zip, fileName) {
  const file = await getFileFromZip(zip, fileName, "CUR", "uint8array");

  if (file == null) {
    return null;
  }

  const contents = file.contents;

  if (arrayStartsWith(contents, RIFF_MAGIC)) {
    return {
      type: "ani",
      aniData: contents
    };
  }

  return {
    type: "cur",
    url: curUrlFromByteArray(contents)
  };
}