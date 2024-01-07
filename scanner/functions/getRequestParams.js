function getRequestParams(params, request) {
  return Object.assign(
    {
      'REQUEST': request,
      'SERVICE': 'WMS',
      'VERSION': DEFAULT_VERSION,
      'FORMAT': 'image/png',
      'STYLES': '',
      'TRANSPARENT': true,
    },
    params,
  );
}