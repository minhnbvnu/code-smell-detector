function contenttype_can_be_redirected(contentType) {
		// disable redirecting if redirecting to/from audio/video is disabled
		if (/^video\//.test(contentType))
			return !!settings.redirect_video;
		if (/^audio\//.test(contentType))
			return !!settings.redirect_audio;
		// amazonaws's error page are application/xml
		// fixme: why not search for image/ or video/ instead?
		return !(/^(?:text|application)\//.test(contentType));
	}