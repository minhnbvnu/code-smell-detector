function go_up() {
	// can't use $iframe[0].contentWindow.location (unless page is on the same domain)
	go_to(get_up_address(active_address));
}