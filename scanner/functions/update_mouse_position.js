function update_mouse_position(event) {
	const rect = canvas.getBoundingClientRect();
	mouse_x = ~~(event.clientX - rect.left);
	mouse_y = ~~(event.clientY - rect.top);
}