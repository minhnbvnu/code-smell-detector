function getPlugins(){
		var plugins = $p.plugins,
			f = function(){};
		f.prototype = plugins;

		// do not overwrite functions if external definition
		f.prototype.compile    = plugins.compile || compile;
		f.prototype.render     = plugins.render || render;
		f.prototype.autoRender = plugins.autoRender || autoRender;
		f.prototype.find       = plugins.find || find;

		// give the compiler and the error handling to the plugin context
		f.prototype._compiler  = compiler;
		f.prototype._error     = error;

		return new f();
	}