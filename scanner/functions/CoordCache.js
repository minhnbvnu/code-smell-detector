function CoordCache(options) {
        this.isHorizontal = false; // whether to query for left/right/width
        this.isVertical = false; // whether to query for top/bottom/height
        this.els = $(options.els);
        this.isHorizontal = options.isHorizontal;
        this.isVertical = options.isVertical;
        this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
    }