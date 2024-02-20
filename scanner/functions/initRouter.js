function initRouter(obj, route, type) {
  Router[type || 'hash'].subscribe(obj, route);
  return obj;
}