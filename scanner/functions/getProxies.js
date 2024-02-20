function getProxies() {
  try {
    if (typeof window !== "undefined") {
      return (window.$$LiveReactLoadProxies = window.$$LiveReactLoadProxies || {})
    }
  } catch (ignore) {
  }
}