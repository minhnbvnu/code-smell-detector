function isRoute(me, you) {
  return isRouteInternal(me, you) || isRouteInternal(you, me);
}