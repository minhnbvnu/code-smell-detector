constructor(x, y, width, height, img_or_canvas) {
		super(x, y, width, height, true);

		this.$el.addClass("selection");
		let last_tool_transparent_mode = tool_transparent_mode;
		let last_background_color = selected_colors.background;
		this._on_option_changed = () => {
			if (!this.source_canvas) {
				return;
			}
			if (last_tool_transparent_mode !== tool_transparent_mode ||
				last_background_color !== selected_colors.background) {
				last_tool_transparent_mode = tool_transparent_mode;
				last_background_color = selected_colors.background;
				this.update_tool_transparent_mode();
			}
		};
		$G.on("option-changed", this._on_option_changed);

		this.instantiate(img_or_canvas);
	}