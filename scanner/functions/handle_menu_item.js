async function handle_menu_item(top_level_menu_index, item_index, submenu_item_index) {
	close_menus();
	triggering_menus = true;
	window.dispatchEvent(new Event("focus")); // make the game think it's focused
	canvas.style.pointerEvents = "none";
	const delay = 100;
	await sleep(delay);
	click(30 + top_level_menu_index * 50, 15);
	await sleep(delay);
	click(30 + top_level_menu_index * 50, 35 + item_index * 16);
	await sleep(delay);
	if (submenu_item_index !== undefined) {
		click(200 + top_level_menu_index * 50, 35 + item_index * 16 + submenu_item_index * 16);
		await sleep(delay);
	}
	canvas.style.pointerEvents = "auto";
	if (!menus_open) {
		stop_freeze_frame();
	}
	triggering_menus = false;
}