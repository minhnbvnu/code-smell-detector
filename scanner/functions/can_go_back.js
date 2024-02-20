function can_go_back() {
	try {
		// return $iframe[0].contentWindow.history.length > 1;
		return history_back_stack.length > 0;
	} catch (e) {
		return false;
	}
}