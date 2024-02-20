function $ToolWindow($component) {
	return make_window_supporting_scale({
		$component,
		toolWindow: true,
	});
}