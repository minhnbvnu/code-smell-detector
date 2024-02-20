function getOpacity(xdNode) {
	// TODO: CE: Calculate opacity based off of parents compositing mode (whether or not it exports a blend mask widget that has it's own opacity and forces compositing)
	let o = xdNode, opacity = 1.0;
	while (o) {
		if (o.opacity != null) { opacity *= o.opacity; }
		o = o.parent;
	}
	return opacity;
}