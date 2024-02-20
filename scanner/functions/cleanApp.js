function cleanApp (app) {
  let developerUrl, developerId;
  if (app['im:artist'].attributes) {
    developerUrl = app['im:artist'].attributes.href;

    if (app['im:artist'].attributes.href.includes('/id')) {
      // some non developer urls can sneak in here
      // e.g. href: 'https://itunes.apple.com/us/artist/sling-tv-llc/959665097?mt=8&uo=2'
      developerId = app['im:artist'].attributes.href.split('/id')[1].split('?mt')[0];
    }
  }

  const price = parseFloat(app['im:price'].attributes.amount);
  return {
    id: app.id.attributes['im:id'],
    appId: app.id.attributes['im:bundleId'],
    title: app['im:name'].label,
    icon: app['im:image'][app['im:image'].length - 1].label,
    url: parseLink(app),
    price,
    currency: app['im:price'].attributes.currency,
    free: price === 0,
    description: app.summary ? app.summary.label : undefined,
    developer: app['im:artist'].label,
    developerUrl,
    developerId,
    genre: app.category.attributes.label,
    genreId: app.category.attributes['im:id'],
    released: app['im:releaseDate'].label
  };
}