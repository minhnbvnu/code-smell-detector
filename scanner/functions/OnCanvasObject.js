constructor(x, y, width, height, hideMainCanvasHandles) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.hideMainCanvasHandles = hideMainCanvasHandles;
		this.$el = $(E("div")).addClass("on-canvas-object").appendTo($canvas_area);
		if (this.hideMainCanvasHandles) {
			canvas_handles.hide();
		}
		$G.on("resize theme-load", this._global_resize_handler = () => {
			this.position();
		});
	}