function send_info_event(item) {
		// @TODO: in a future version, give the whole menu item definition (or null)
		const description = item?.description || "";
		if (window.jQuery) {
			// old API (using jQuery's "extraParameters"), made forwards compatible with new API (event.detail)
			const event = new window.jQuery.Event("info", { detail: { description } });
			const extraParam = {
				toString() {
					console.warn("jQuery extra parameter for info event is deprecated, use event.detail instead");
					return description;
				},
			};
			window.jQuery(menus_el).trigger(event, extraParam);
		} else {
			menus_el.dispatchEvent(new CustomEvent("info", { detail: { description } }));
		}
	}