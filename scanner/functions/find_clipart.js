function find_clipart(query) {
		const bing_url = new URL(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&qft=+filterui:photo-clipart&FORM=IRFLTR`)
		return fetch(`https://jspaint-cors-proxy.herokuapp.com/${bing_url}`)
			.then(response => response.text())
			.then((html) => {
				// handle relative data-src
				html = html.replace(
					/((?:data-src)=["'])(?!(?:https?:|data:))(\/?)/gi,
					($0, $1, $2) => `${$1}${bing_url.origin}${$2 ? bing_url.pathname : ""}`
				);
				// handle relative src and href in a less error-prone way, with a <base> tag
				const doc = new DOMParser().parseFromString(html, "text/html");
				const $html = $(doc.documentElement);
				const base = doc.createElement("base");
				base.href = bing_url.origin + bing_url.pathname;
				doc.head.appendChild(base);

				window.search_page_html = html;
				window.search_page_$html = $html;
				console.log("window.search_page_html and window.search_page_$html are a available for debugging");

				const validate_item = (item) => item.image_url && (item.image_url.match(/^data:/) ? item.image_url.length > 1000 : true);

				let items = $html.find("[m]").toArray()
					.map((el) => el.getAttribute("m"))
					.map((json) => {
						try {
							return JSON.parse(json);
						} catch (error) {
							return null;
						}
					})
					.filter((maybe_parsed) => maybe_parsed && maybe_parsed.murl)
					.map(({ murl, t }) => ({ image_url: murl, title: t || "" }))
					.filter(validate_item);

				// fallback to thumbnails in case they get rid of the "m" attribute (thumbnails are not as good, more likely to be jpeg)
				if (items.length === 0) {
					console.log("Fallback to thumbnails");
					items = $html.find("img.mimg").toArray()
						.map((el) => ({ image_url: el.src || el.dataset.src, title: "" }))
						.filter(validate_item);
				}
				// fallback in case they also change the class for images (this may match totally irrelevant things)
				if (items.length === 0) {
					console.log("Fallback to most imgs");
					items = $html.find("img:not(.sw_spd):not(.rms_img):not(.flagIcon)").toArray()
						.filter((el) => !el.closest("[role='navigation'], nav")) // ignore "Related searches", "Refine your search" etc.
						.map((el) => ({ image_url: el.src || el.dataset.src, title: "" }))
						.filter(validate_item);
				}
				console.log(`Search results for '${query}':`, items);
				if (items.length === 0) {
					const error = new Error(`failed to get clipart: no results returned for query '${query}'`);
					error.code = "no-results";
					throw error;
				}
				return items;
			})
	}