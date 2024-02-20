async function persistedViewerStars(user) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id7, variables: {viewer: user.login}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}