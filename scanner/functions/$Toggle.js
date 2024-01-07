function $Toggle(xi, thing, label, description) {
			const $button = $(E("button")).addClass("toggle").attr({
				"aria-pressed": false,
				"aria-label": label,
				"aria-description": description,
			});
			const $icon = $(E("span")).addClass("icon").appendTo($button);
			$button.css({
				width: 23,
				height: 22,
				padding: 0,
				display: "inline-flex",
				alignContent: "center",
				alignItems: "center",
				justifyContent: "center",
			});
			$icon.css({
				flex: "0 0 auto",
				display: "block",
				width: 16,
				height: 16,
				"--icon-index": xi,
			});
			$button.on("click", () => {
				$button.toggleClass("selected");
				text_tool_font[thing] = $button.hasClass("selected");
				$button.attr("aria-pressed", $button.hasClass("selected"));
				update_font();
			});
			if (text_tool_font[thing]) {
				$button.addClass("selected").attr("aria-pressed", true);
			}
			return $button;
		}