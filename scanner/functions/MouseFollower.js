function MouseFollower(sourceEl, options) {
        this.isFollowing = false;
        this.isHidden = false;
        this.isAnimating = false; // doing the revert animation?
        this.options = options = options || {};
        this.sourceEl = sourceEl;
        this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
    }