function embedCode(container, externalUrl, embedProvider) {

		var requestUrl = getRequestUrl(embedProvider, externalUrl),
				ajaxopts = jQuery.extend({
					url: requestUrl,
					type: 'get',
					dataType: 'json',
					// error: jsonp request doesnt' support error handling
					success:  function (data) {
						var oembedData = jQuery.extend({}, data);
						switch (oembedData.type) {
							case "photo":
								oembedData.code = jQuery.fn.oembed.getPhotoCode(externalUrl, oembedData);
								break;
							case "video":
								oembedData.code = jQuery.fn.oembed.getVideoCode(externalUrl, oembedData);
								break;
							case "rich":
								oembedData.code = jQuery.fn.oembed.getRichCode(externalUrl, oembedData);
								break;
							default:
								oembedData.code = jQuery.fn.oembed.getGenericCode(externalUrl, oembedData);
								break;
						}
						settings.beforeEmbed.call(container, oembedData);
						settings.onEmbed.call(container, oembedData);
						settings.afterEmbed.call(container, oembedData);
					},
					error: settings.onError.call(container, externalUrl, embedProvider)
				}, settings.ajaxOptions || { } );

			jQuery.ajax( ajaxopts );        
	    }