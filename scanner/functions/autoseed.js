function autoseed() {
	      try {
	        var out;

	        if (nodecrypto && (out = nodecrypto.randomBytes)) {
	          // The use of 'out' to remember randomBytes makes tight minified code.
	          out = out(width);
	        } else {
	          out = new Uint8Array(width);
	          (global.crypto || global.msCrypto).getRandomValues(out);
	        }

	        return tostring(out);
	      } catch (e) {
	        var browser = global.navigator,
	            plugins = browser && browser.plugins;
	        return [+new Date(), global, plugins, global.screen, tostring(pool)];
	      }
	    }