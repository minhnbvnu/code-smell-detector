function get_icon_for_tools(tools) {
		if (tools.length === 1) {
			return get_icon_for_tool(tools[0]);
		}
		const icon_canvas = make_canvas(16, 16);

		Promise.all(tools.map((tool) => load_image_simple(`help/${tool.help_icon}`)))
			.then((icons) => {
				icons.forEach((icon, i) => {
					const w = icon_canvas.width / icons.length;
					const x = i * w;
					const h = icon_canvas.height;
					const y = 0;
					icon_canvas.ctx.drawImage(icon, x, y, w, h, x, y, w, h);
				});
			})
		return icon_canvas;
	}