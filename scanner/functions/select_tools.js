function select_tools(tools) {
	for (let i = 0; i < tools.length; i++) {
		select_tool(tools[i], i > 0);
	}
	update_helper_layer();
}