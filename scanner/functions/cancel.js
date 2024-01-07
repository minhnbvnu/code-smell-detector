function cancel(going_to_history_node, discard_document_state) {
	// Note: this function should be idempotent.
	// `cancel(); cancel();` should do the same thing as `cancel();`
	if (!history_node_to_cancel_to) {
		return;
	}

	// For two finger panning, I want to prevent history nodes from being created,
	// for performance, and to avoid cluttering the history.
	// (And also so if you undo and then pan, you can still redo (without accessing the nonlinear history window).)
	// Most tools create undoables on pointerup, in which case we can prevent them from being created,
	// but Fill tool creates on pointerdown, so we need to delete a history node in that case.
	// Select tool can create multiple undoables before being cancelled (for moving/resizing/inverting/smearing),
	// but only the last should be discarded due to panning. (All of them should be undone you hit Esc. But not deleted.)
	const history_node_to_discard = (
		discard_document_state &&
		current_history_node.parent && // can't discard the root node
		current_history_node !== history_node_to_cancel_to && // can't discard what will be the active node
		current_history_node.futures.length === 0 // prevent discarding whole branches of history if you go back in history and then pan / hit Esc
	) ? current_history_node : null;

	// console.log("history_node_to_discard", history_node_to_discard, "current_history_node", current_history_node, "history_node_to_cancel_to", history_node_to_cancel_to);

	// history_node_to_cancel_to = history_node_to_cancel_to || current_history_node;
	$G.triggerHandler("pointerup", ["canceling", discard_document_state]);
	for (const selected_tool of selected_tools) {
		selected_tool.cancel && selected_tool.cancel();
	}
	if (!going_to_history_node) {
		// Note: this will revert any changes from other users in multi-user sessions
		// which isn't good, but there's no real conflict resolution in multi-user mode anyways
		go_to_history_node(history_node_to_cancel_to, true);

		if (history_node_to_discard) {
			const index = history_node_to_discard.parent.futures.indexOf(history_node_to_discard);
			if (index === -1) {
				show_error_message("History node not found. Please report this bug.");
				console.log("history_node_to_discard", history_node_to_discard);
				console.log("current_history_node", current_history_node);
				console.log("history_node_to_discard.parent", history_node_to_discard.parent);
			} else {
				history_node_to_discard.parent.futures.splice(index, 1);
				$G.triggerHandler("history-update"); // update history view (don't want you to be able to click on the excised node)
				// (@TODO: prevent duplicate update, here vs go_to_history_node)
			}
		}
	}
	history_node_to_cancel_to = null;
	update_helper_layer();
}