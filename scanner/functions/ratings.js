function ratings (opts) {
  return new Promise(function (resolve) {
    if (!opts.id) {
      throw Error('id is required');
    }

    const country = opts.country || 'us';
    const storeFront = common.storeId(opts.country);
    const idValue = opts.id;
    const url = `https://itunes.apple.com/${country}/customer-reviews/id${idValue}?displayable-kind=11`;

    resolve(common.request(url, {
      'X-Apple-Store-Front': `${storeFront},12`
    }, opts.requestOptions));
  })
    .then((html) => {
      if (html.length === 0) {
        throw Error('App not found (404)');
      }

      return parseRatings(html);
    });
}