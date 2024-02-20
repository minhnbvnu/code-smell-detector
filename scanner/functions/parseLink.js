function parseLink (app) {
  if (app.link) {
    const linkArray = Array.isArray(app.link) ? app.link : [app.link];
    const link = linkArray.find(link => link.attributes.rel === 'alternate');
    return link && link.attributes.href;
  }
  return undefined;
}