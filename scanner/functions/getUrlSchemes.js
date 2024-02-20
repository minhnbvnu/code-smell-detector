function getUrlSchemes(urls) {
	            if (isNullOrEmpty(urls))
	                return ["."];
	            if (jQuery.isArray(urls))
	                return urls;
	            return urls.split(";");
	        }