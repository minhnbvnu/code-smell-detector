function update_helper_layer(e){
	// e may be a number from requestAnimationFrame callback; ignore that
	if (e && isFinite(e.clientX)) {
		info_for_updating_pointer = {clientX: e.clientX, clientY: e.clientY, devicePixelRatio};
	}
	if (helper_layer_update_queued) {
		// window.console && console.log("update_helper_layer - nah, already queued");
		return;
	} else {
		// window.console && console.log("update_helper_layer");
	}
	helper_layer_update_queued = true;
	requestAnimationFrame(()=> {
		helper_layer_update_queued = false;
		update_helper_layer_immediately();
	});
}