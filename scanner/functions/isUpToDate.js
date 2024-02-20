async function isUpToDate(url, file, pathToFile) {
  if (!file) {
    return false;
  }
  try {
    const response = await got.head(url, {
      timeout: 2500,
    });
    if (response.headers['content-length'] === `${fs.statSync(pathToFile).size}`) {
      return true;
    }
    return response.headers.etag.includes(md5(file).toString());
  } catch (err) {
    logError(`Remote file size/hash in ${url} don't match with local file ${pathToFile}`);
    return false;
  }
}