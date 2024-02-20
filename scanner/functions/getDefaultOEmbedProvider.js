function getDefaultOEmbedProvider(defaultOEmbedProvider) {
	        var url = "http://oohembed.com/oohembed/";
	        if (defaultOEmbedProvider == "embed.ly")
	            url = "http://api.embed.ly/v1/api/oembed?";
	        return new jQuery.fn.oembed.OEmbedProvider(defaultOEmbedProvider, null, null, url, "callback");
	    }