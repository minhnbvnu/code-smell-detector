function handle_url_case() {
		if (!address.match(/^https?:\/\/web.archive.org\//) && !address.startsWith(window.location.origin)) {
			// special exemption: show archive but later version
			if (address.match(/^https?:\/\/(www\.)?(windows93.net)/)) {
				address = "https://web.archive.org/web/2015-05-05/" + address;
			// complete exemptions:
			} else if (
				!address.match(/^https?:\/\/(www\.)?(copy.sh|topotech.github.io\/interdimensionalcable|isaiahodhner.io|brie.fi\/ng)/) &&
				!address.match(/^(file|data|blob):\/\//)
			) {
				address = "https://web.archive.org/web/1998/" + address;
			}
		}
		is_url = true;
		// zone = address.startsWith(window.location.origin) ? "local" : "internet"; // @TODO
		zone = "internet";
		return { normalized_address: address, is_url, zone };
	}