function is_awaiting_deployment() {
	// ball at bottom (resting on plunger)
	// Note that the ball bounces, so this state will bounce a bit too.
	// @TODO: the ball can actually rest in different places
	// I should probably check a region for gray pixels,
	// rather than a specific pixel (or set of pixel possibilities)
	return pixel_match(327, 388, [50, 50, 50, 255]);
}