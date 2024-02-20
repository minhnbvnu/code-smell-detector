function wrapMiddlewareApp(key, route, loader) {
  try {
    const middleware = loader.app.middlewares[key];
    const optionsRoute = route.meta ? route.meta[key] : null;
    const mw = middleware(optionsRoute, loader.app);
    mw._name = key;
    return mw;
  } catch (err) {
    console.log(`\nmiddleware error: ${key}\n`);
    throw err;
  }
}