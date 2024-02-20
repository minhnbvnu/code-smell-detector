function getRouteDisplayName(url, params) {
  console.log('url display: ', url, params);
  if (!url) return '';

  const urlArr = url.split('?');
  const routeObj = ROUTE_NAME_MAP[urlArr[0]];

  if (!routeObj) return '';
  if ('pages/trend/index' === urlArr[0] && params) {
    return routeObj.displayName(params.type, params.site);
  }
  return routeObj.displayName();
}