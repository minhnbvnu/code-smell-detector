function initializeProviders() {

	        activeProviders = [];

	        var defaultProvider, restrictedProviders = [], i, provider;

	        if (!isNullOrEmpty(settings.allowedProviders)) {
	            for (i = 0; i < jQuery.fn.oembed.providers.length; i++) {
	                if (jQuery.inArray(jQuery.fn.oembed.providers[i].name, settings.allowedProviders) >= 0)
	                    activeProviders.push(jQuery.fn.oembed.providers[i]);
	            }
	            // If there are allowed providers, jquery-oembed cannot be greedy
	            settings.greedy = false;

	        } else {
	            activeProviders = jQuery.fn.oembed.providers;
	        }

	        if (!isNullOrEmpty(settings.disallowedProviders)) {
	            for (i = 0; i < activeProviders.length; i++) {
	                if (jQuery.inArray(activeProviders[i].name, settings.disallowedProviders) < 0)
	                    restrictedProviders.push(activeProviders[i]);
	            }
	            activeProviders = restrictedProviders;
	            // If there are allowed providers, jquery-oembed cannot be greedy
	            settings.greedy = false;
	        }

	        if (!isNullOrEmpty(settings.customProviders)) {
	            jQuery.each(settings.customProviders, function (n, customProvider) {
	                if (customProvider instanceof jQuery.fn.oembed.OEmbedProvider) {
	                    activeProviders.push(provider);
	                } else {
	                    provider = new jQuery.fn.oembed.OEmbedProvider();
	                    if (provider.fromJSON(customProvider))
	                        activeProviders.push(provider);
	                }
	            });
	        }

	        // If in greedy mode, we add the default provider
	        defaultProvider = getDefaultOEmbedProvider(settings.defaultOEmbedProvider);
	        if (settings.greedy == true) {
	            activeProviders.push(defaultProvider);
			}
	        // If any provider has no apiendpoint, we use the default provider endpoint
	        for (i = 0; i < activeProviders.length; i++) {
	            if (activeProviders[i].apiendpoint == null)
	                activeProviders[i].apiendpoint = defaultProvider.apiendpoint;
	        }
	    }