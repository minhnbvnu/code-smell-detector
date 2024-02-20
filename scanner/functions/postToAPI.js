function postToAPI({root, endpoint, body}) {
  let url = [root, endpoint].join('/');

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}