function buildHarHeaders (headers) {
  return headers ? Object.keys(headers).map(function (key) {
    return {
      name: key,
      // header values are required to be strings
      value: headers[key].toString()
    };
  }) : [];
}