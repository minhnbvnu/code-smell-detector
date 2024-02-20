function chainwrap(depth, first, prev) {
	depth = depth || 0;
	var last = prev || new Wrap();
	first = first || last;

	if (depth == 1) {
		first.wrap = last;
	}
	if (depth > 1) {
		last = chainwrap(depth-1, first, new Wrap(last));
	}

	return last;
}