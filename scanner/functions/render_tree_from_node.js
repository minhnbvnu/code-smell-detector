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