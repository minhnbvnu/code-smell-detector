function registerCoffee(options, ext) {
	// Is CoffeeScript being used? Could be through our own _coffee binary,
	// through its coffee binary, or through require('coffee-script').
	// The latter two add a .coffee require extension handler.
	var coffeeRegistered = require.extensions['.coffee'];
	if (!coffeeRegistered && !coffeeExecuting()) return;

	// load coffee
	var coffee = specialRequire("coffee-script");
	if (!coffee.register) throw new Error('cannot register coffee-script: register method not found');

	// ensure that .coffee extension is registered
	// If we're running via _coffee, we should run CoffeeScript ourselves so
	// that it can register its regular .coffee handler. We make sure to do
	// this relative to the caller's working directory instead of from here.
	// (CoffeeScript 1.7+ no longer registers a handler automatically.)
	if (!coffeeRegistered) coffee.register();
	coffeeRegistered = true;

	// register ._coffee extension
	require.extensions[ext] = requireHook(options, ext);
}