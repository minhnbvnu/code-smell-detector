function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  };
}