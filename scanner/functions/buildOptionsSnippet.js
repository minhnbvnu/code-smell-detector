function buildOptionsSnippet (hasParams, hasHeaders, requestTimeout, followRedirect) {
  let options = [],
    mappedArray;
  if (hasParams) {
    options.push({ key: 'postfields', value: 'params' });
  }
  if (hasHeaders) {
    options.push({ key: 'httpheader', value: 'headers' });
  }
  if (requestTimeout && requestTimeout !== 0) {
    options.push({ key: 'timeout.ms', value: requestTimeout });
  }
  if (followRedirect === true) {
    options.push({ key: 'followlocation', value: 'TRUE' });
  }
  mappedArray = options.map((entry) => {
    return `${entry.key} = ${entry.value}`;
  });
  return `${mappedArray.join(', ')}`;
}