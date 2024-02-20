function is_internet_url(url) {
		if (!url || typeof url !== "string")
			return false;
		if (!/^https?:\/\//.test(url))
			return false;
		// local addresses (IPv4)
		if (/^[a-z]+:\/\/(127\.0\.0\.1|192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(?:1[6-9]|2[0-9]|3[01])\.[0-9]+\.[0-9]+|localhost|[^/.]+)\//.test(url))
			return false;
		// IPv6 (TODO: implement)
		if (/^[a-z]+:\/\/(?:[0-9a-f]*\:){1,}\//.test(url))
			return false;
		return true;
	}