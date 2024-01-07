function update_not_for_modern_theme() {
		const not_for_modern = document.querySelectorAll("link.not-for-modern");
		for (const link of not_for_modern) {
			link.disabled = current_theme === "modern.css";
		}
	}