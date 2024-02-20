function throwAsError(res) {
  return res.text()
    .then((data) => {
      let errorObject;
      try {
        errorObject = JSON.parse(data);
      } catch (error) {
        errorObject = data;
      }

      throw new DropboxResponseError(res.status, res.headers, errorObject);
    });
}