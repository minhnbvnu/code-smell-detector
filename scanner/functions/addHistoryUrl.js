function addHistoryUrl(url, displayName) {
  const allRoutes = app.globalData.historyRoutes;
  const hasCurUrl = allRoutes.some(route => route.url === url);

  if (hasCurUrl) return;

  app.globalData.historyRoutes.unshift({
    url,
    displayName,
  });
}