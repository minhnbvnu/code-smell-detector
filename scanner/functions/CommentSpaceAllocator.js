function CommentSpaceAllocator(width, height) {
		if (width === void 0) {
			width = 0;
		}
		if (height === void 0) {
			height = 0;
		}
		this._pools = [[]];
		this.avoid = 1;
		this._width = width;
		this._height = height;
	}