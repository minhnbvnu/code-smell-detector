function getJSON(url) {
  return new Promise(function (resolve, reject) {
    /**
     * @param {ProgressEvent<XMLHttpRequest>} event The load event.
     */
    function onLoad(event) {
      const client = event.target;
      // status will be 0 for file:// urls
      if (!client.status || (client.status >= 200 && client.status < 300)) {
        let data;
        try {
          data = JSON.parse(client.responseText);
        } catch (err) {
          const message = 'Error parsing response text as JSON: ' + err.message;
          reject(new Error(message));
          return;
        }
        resolve(data);
        return;
      }

      reject(new ResponseError(client));
    }

    /**
     * @param {ProgressEvent<XMLHttpRequest>} event The error event.
     */
    function onError(event) {
      reject(new ClientError(event.target));
    }

    const client = new XMLHttpRequest();
    client.addEventListener('load', onLoad);
    client.addEventListener('error', onError);
    client.open('GET', url);
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });
}