function set_icon(icon_id) {
	document.querySelector("link[rel~=icon]").href = getIconPath(icon_id, 16)
	if (frameElement && frameElement.$window) {
		frameElement.$window.setIcons({
			"16": getIconPath(icon_id, 16),
			"32": getIconPath(icon_id, 32),
		});
	}
}