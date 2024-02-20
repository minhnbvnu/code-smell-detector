async function APIRequest(who) {
  if (who === 'facebook') {
    const call1 = fetch('https://facebook.com/someOtherResource').then((res) =>
      res.json()
    )
    const call2 = fetch('https://facebook.com').then((res) => res.json())
    return Promise.all([call1, call2])
  } else if (who === 'twitter') {
    return fetch('https://twitter.com').then((res) => res.json())
  } else if (who === 'instagram') {
    return fetch(new URL('https://instagram.com')).then((res) => res.json())
  } else if (who === 'bing') {
    const stringifier = {
      toString: () => 'https://bing.com'
    }
    return fetch(stringifier).then((res) => res.json())
  } else {
    return fetch('https://google.com').then((res) => res.json())
  }
}