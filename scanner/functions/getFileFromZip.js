async function getFileFromZip(zip, fileName, ext, mode) {
  const files = zip.file(getFilenameRegex(fileName, ext));

  if (!files.length) {
    return null;
  } // Windows file system is case insensitve, but zip files are not.
  // This means that it's possible for a zip to contain both `main.bmp` _and_
  // `main.BMP` but in Winamp only one will be materialized onto disk when
  // decompressing. I suspect that in this case later files in the archive
  // overwrite earlier ones. To mimic that behavior we use the last matching
  // file.
  //
  // This works because `JSZip.file` filters the files by iterating the
  // underlying `files` object under the hood:
  // https://github.com/Stuk/jszip/blob/25d401e104926fef8528d670ecfe53f14e77a297/lib/object.js#L182
  // Since JavaScript objects are iterable in the order that the keys were
  // added this _should_ mean that by taking the last file here we will get
  // the last file that JSZip extracted.


  const lastFile = files[files.length - 1];

  try {
    const contents = await lastFile.async(mode);
    return {
      contents,
      name: lastFile.name
    };
  } catch (e) {
    console.warn(`Failed to extract "${fileName}.${ext}" from the skin archive.`);
    return null;
  }
}