function CommentManager(stageObject) {
		var __timer = 0;

		this._listeners = {};
		this._lastPosition = 0;

		this.stage = stageObject;
		this.options = {
			global: {
				opacity: 1,
				scale: 1,
				className: "cmt"
			},
			scroll: {
				opacity: 1,
				scale: 1
			},
			limit: 0
		};
		this.timeline = [];
		this.runline = [];
		this.position = 0;
		this.limiter = 0;
		this.filter = null;
		this.csa = {
			scroll: new CommentSpaceAllocator(0, 0),
			top: new AnchorCommentSpaceAllocator(0, 0),
			bottom: new AnchorCommentSpaceAllocator(0, 0),
			reverse: new CommentSpaceAllocator(0, 0),
			scrollbtm: new CommentSpaceAllocator(0, 0)
		};

		/** Precompute the offset width **/
		this.width = this.stage.offsetWidth;
		this.height = this.stage.offsetHeight;
		this.startTimer = function () {
			if (__timer > 0) return;
			var lastTPos = new Date().getTime();
			var cmMgr = this;
			__timer = window.setInterval(function () {
				var elapsed = new Date().getTime() - lastTPos;
				lastTPos = new Date().getTime();
				cmMgr.onTimerEvent(elapsed, cmMgr);
			}, 10);
		};
		this.stopTimer = function () {
			window.clearInterval(__timer);
			__timer = 0;
		};
	}