function find_tabstops(container_el) {
	const $el = $(container_el);
	// This function finds focusable controls, but not necessarily all of them;
	// for radio elements, it only gives one: either the checked one, or the first one if none are checked.

	// Note: for audio[controls], Chrome at least has two tabstops (the audio element and three dots menu button).
	// It might be possible to detect this in the shadow DOM, I don't know, I haven't worked with the shadow DOM.
	// But it might be more reliable to make a dummy tabstop element to detect when you tab out of the first/last element.
	// Also for iframes!
	// Assuming that doesn't mess with screen readers.
	// Right now you can't tab to the three dots menu if it's the last element.
	// @TODO: see what ally.js does. Does it handle audio[controls]? https://allyjs.io/api/query/tabsequence.html

	let $controls = $el.find(`
		input:enabled,
		textarea:enabled,
		select:enabled,
		button:enabled,
		a[href],
		[tabIndex='0'],
		details summary,
		iframe,
		object,
		embed,
		video[controls],
		audio[controls],
		[contenteditable]:not([contenteditable='false'])
	`).filter(":visible");
	// const $controls = $el.find(":tabbable"); // https://api.jqueryui.com/tabbable-selector/

	// Radio buttons should be treated as a group with one tabstop.
	// If there's no selected ("checked") radio, it should still visit the group,
	// but if there is a selected radio in the group, it should skip all unselected radios in the group.
	const radios = {}; // best radio found so far, per group
	const to_skip = [];
	for (const el of $controls.toArray()) {
		if (el.nodeName.toLowerCase() === "input" && el.type === "radio") {
			if (radios[el.name]) {
				if (el.checked) {
					to_skip.push(radios[el.name]);
					radios[el.name] = el;
				} else {
					to_skip.push(el);
				}
			} else {
				radios[el.name] = el;
			}
		}
	}
	const $tabstops = $controls.not(to_skip);
	// debug viz:
	// $tabstops.css({boxShadow: "0 0 2px 2px green"});
	// $(to_skip).css({boxShadow: "0 0 2px 2px gray"})
	return $tabstops;
}