function show_document_history() {
	if ($document_history_prompt_window) {
		$document_history_prompt_window.close();
	}
	if ($document_history_window) {
		$document_history_window.close();
	}
	const $w = $document_history_window = new $Window({
		title: "Document History",
		resizable: false,
		maximizeButton: false,
		minimizeButton: false,
	});
	// $w.prependTo("body").css({position: ""});
	$w.addClass("history-window squish");
	$w.$content.html(`
		<label>
			<!--<input type="checkbox" id="history-show-all-branches" checked> Show all branches-->
			<!--<input type="checkbox" id="history-view-linear" checked> Linear timeline-->
			<select id="history-view-mode" class="inset-deep">
				<option value="linear">Linear timeline</option>
				<option value="tree">Tree</option>
			</select>
		</label>
		<div class="history-view" tabIndex="0"></div>
	`);

	const $history_view = $w.$content.find(".history-view");
	$history_view.focus();

	let previous_scroll_position = 0;

	let rendered_$entries = [];
	let current_$entry;

	// let $linear_checkbox = $w.$content.find("#history-view-linear");
	// let linear = $linear_checkbox.is(":checked");
	// $linear_checkbox.on("change", () => {
	// 	linear = $linear_checkbox.is(":checked");
	// 	render_tree();
	// });
	let $mode_select = $w.$content.find("#history-view-mode");
	$mode_select.css({
		margin: "10px",
	});
	let mode = $mode_select.val();
	$mode_select.on("change", () => {
		mode = $mode_select.val();
		render_tree();
	});

	function render_tree_from_node(node) {
		const $entry = $(`
			<div class="history-entry">
				<div class="history-entry-icon-area"></div>
				<div class="history-entry-name"></div>
			</div>
		`);
		// $entry.find(".history-entry-name").text((node.name || "Unknown") + (node.soft ? " (soft)" : ""));
		$entry.find(".history-entry-name").text((node.name || "Unknown") + (node === root_history_node ? " (Start of History)" : ""));
		$entry.find(".history-entry-icon-area").append(node.icon);
		if (mode === "tree") {
			let dist_to_root = 0;
			for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
				dist_to_root++;
			}
			$entry.css({
				marginInlineStart: `${dist_to_root * 8}px`,
			});
		}
		if (node === current_history_node) {
			$entry.addClass("current");
			current_$entry = $entry;
			requestAnimationFrame(()=> {
				// scrollIntoView causes <html> to scroll when the window is partially offscreen,
				// despite overflow: hidden on html and body, so it's not an option.
				$history_view[0].scrollTop =
					Math.min(
						$entry[0].offsetTop,
						Math.max(
							previous_scroll_position,
							$entry[0].offsetTop - $history_view[0].clientHeight + $entry.outerHeight()
						)
					);
			});
		} else {
			const history_ancestors = get_history_ancestors(current_history_node);
			if (history_ancestors.indexOf(node) > -1) {
				$entry.addClass("ancestor-of-current");
			}
		}
		for (const sub_node of node.futures) {
			render_tree_from_node(sub_node);
		}
		$entry.on("click", ()=> {
			go_to_history_node(node);
		});
		$entry.history_node = node;
		rendered_$entries.push($entry);
	}
	const render_tree = ()=> {
		previous_scroll_position = $history_view.scrollTop();
		$history_view.empty();
		rendered_$entries = [];
		render_tree_from_node(root_history_node);
		if (mode === "linear") {
			rendered_$entries.sort(($a, $b) => {
				if ($a.history_node.timestamp < $b.history_node.timestamp) {
					return -1;
				}
				if ($b.history_node.timestamp < $a.history_node.timestamp) {
					return +1;
				}
				return 0;
			});
		} else {
			rendered_$entries.reverse();
		}
		rendered_$entries.forEach(($entry)=> {
			$history_view.append($entry);
		});
	};
	render_tree();

	// This is different from Ctrl+Z/Ctrl+Shift+Z because it goes over all branches of the history tree, chronologically,
	// not just one branch.
	const go_by = (index_delta)=> {
		const from_index = rendered_$entries.indexOf(current_$entry);
		const to_index = from_index + index_delta;
		if (rendered_$entries[to_index]) {
			rendered_$entries[to_index].click();
		}
	};
	$history_view.on("keydown", (event)=> {
		if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
			if (event.key === "ArrowDown" || event.key === "Down") {
				go_by(1);
				event.preventDefault();
			} else if (event.key === "ArrowUp" || event.key === "Up") {
				go_by(-1);
				event.preventDefault();
			}
		}
	});

	$G.on("history-update", render_tree);
	$w.on("close", ()=> {
		$G.off("history-update", render_tree);
	});

	$w.center();
}