function can_go_forward() {
	try {
		// return $iframe[0].contentWindow.history.length > 1;
		return history_forward_stack.length > 0;
	} catch (e) {
		return false;
	}
}