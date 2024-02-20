function get_segments(component_area_el, pos_axis, exclude_component_el) {
	const $other_components = $(component_area_el).find(".component").not(exclude_component_el);
	return $other_components.toArray().map((component_el)=> {
		const segment = {element: component_el};
		if (pos_axis === "top") {
			segment.pos = component_el.offsetTop;
			segment.length = component_el.clientHeight;
		} else if (pos_axis === "left") {
			segment.pos = component_el.offsetLeft;
			segment.length = component_el.clientWidth;
		} else if (pos_axis === "right") {
			segment.pos = component_area_el.scrollWidth - component_el.offsetLeft;
			segment.length = component_el.clientWidth;
		}
		return segment;
	});
}