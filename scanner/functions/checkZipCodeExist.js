async function checkZipCodeExist(client, objectName) {
  try {
    await client.head(objectName);
    return true;
  } catch (e) {
    if (e.name === 'NoSuchKeyError') {
      return false;
    }

    throw e;
  }
}