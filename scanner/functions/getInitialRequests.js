function getInitialRequests() {
  if (!isExtension) {
    return [];
  }

  // TODO CHECK OPENER (?)

  const urlParams = new URLSearchParams(window.location.hash.slice(1));
  const request = JSON.parse(urlParams.get('request'));

  if (request.method === 'sign') {
    const dataObj = request.params.data;
    // Deserialize `data` into a Uint8Array
    if (!dataObj) {
      throw new Error('Missing "data" params for "sign" request');
    }

    const data = new Uint8Array(Object.keys(dataObj).length);
    for (const [index, value] of Object.entries(dataObj)) {
      data[index] = value;
    }
    request.params.data = data;
  }

  return [request];
}