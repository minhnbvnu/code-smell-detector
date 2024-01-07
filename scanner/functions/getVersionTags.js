function getVersionTags() {
  return new Promise(resolve => {
    let cachedTags;
    if (canUseSessionStorage) {
      cachedTags = sessionStorage.getItem(TAGS_CACHE_KEY);
    }
    if (cachedTags) {
      cachedTags = JSON.parse(cachedTags);
      resolve(cachedTags);
    } else {
      fetch('https://api.github.com/repos/facebook/react/tags?per_page=1000', {
        mode: 'cors',
      })
        .then(res => res.json())
        .then(tags => {
          // A message property indicates an error was sent from the API
          if (tags.message) {
            return resolve(fallbackTags);
          }
          if (canUseSessionStorage) {
            sessionStorage.setItem(TAGS_CACHE_KEY, JSON.stringify(tags));
          }
          resolve(tags);
        })
        .catch(() => resolve(fallbackTags));
    }
  });
}