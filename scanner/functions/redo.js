function redo() {
	if (redos.length < 1) {
		if ($document_history_prompt_window) {
			$document_history_prompt_window.close();
		}
		if (!$document_history_window || $document_history_window.closed) {
			$document_history_prompt_window = showMessageBox({
				title: "Redo",
				messageHTML: `To view all branches of the history tree, click <b>Edit > History</b>.`,
				iconID: "info",
			}).$window;
		}
		return false;
	}

	undos.push(current_history_node);
	let target_history_node = redos.pop();

	while (target_history_node.soft && redos.length) {
		undos.push(target_history_node);
		target_history_node = redos.pop();
	}

	go_to_history_node(target_history_node);

	return true;
}