function getStatusLength(edit, name, template) {
  // https://support.twitter.com/articles/78124-posting-links-in-a-tweet
  const fakeUrl = 'https://t.co/BzHLWr31Ce'
  const status = Mustache.render(template, {name, url: fakeUrl, page: edit.page})
  return status.length
}