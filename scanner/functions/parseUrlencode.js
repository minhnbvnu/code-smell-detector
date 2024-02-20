function parseUrlencode (requestBody, trimFields) {
  //  reducing array of urlencoded form data to array of strings
  return _.reduce(requestBody[requestBody.mode], function (accumalator, data) {
    if (!data.disabled) {
      accumalator.push(`${sanitize(data.key, trimFields)}=${sanitize(data.value, trimFields)}`.replace(/&/g, '%26'));
    }
    return accumalator;
  }, []).join('&');
}