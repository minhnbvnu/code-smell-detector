function CoreComment(parent, init) {
		if (init === void 0) {
			init = {};
		}
		this.mode = 1;
		this.stime = 0;
		this.text = "";
		this.ttl = 4000;
		this.dur = 4000;
		this.cindex = -1;
		this.motion = [];
		this.movable = true;
		this._alphaMotion = null;
		this.absolute = true;
		this.align = 0;
		this._alpha = 1;
		this._size = 25;
		this._color = 0xffffff;
		this._border = false;
		this._shadow = true;
		this._font = "";
		if (!parent) {
			throw new Error("Comment not bound to comment manager.");
		} else {
			this.parent = parent;
		}
		if (init.hasOwnProperty("stime")) {
			this.stime = init["stime"];
		}
		if (init.hasOwnProperty("mode")) {
			this.mode = init["mode"];
		} else {
			this.mode = 1;
		}
		if (init.hasOwnProperty("dur")) {
			this.dur = init["dur"];
			this.ttl = this.dur;
		}
		this.dur *= this.parent.options.global.scale;
		this.ttl *= this.parent.options.global.scale;
		if (init.hasOwnProperty("text")) {
			this.text = init["text"];
		}
		if (init.hasOwnProperty("motion")) {
			this._motionStart = [];
			this._motionEnd = [];
			this.motion = init["motion"];
			var head = 0;
			for (var i = 0; i < init["motion"].length; i++) {
				this._motionStart.push(head);
				var maxDur = 0;
				for (var k in init["motion"][i]) {
					var m = init["motion"][i][k];
					maxDur = Math.max(m.dur, maxDur);
					if (m.easing === null || m.easing === undefined) {
						init["motion"][i][k]["easing"] = CoreComment.LINEAR;
					}
				}
				head += maxDur;
				this._motionEnd.push(head);
			}
			this._curMotion = 0;
		}
		if (init.hasOwnProperty("color")) {
			this._color = init["color"];
		}
		if (init.hasOwnProperty("size")) {
			this._size = init["size"];
		}
		if (init.hasOwnProperty("border")) {
			this._border = init["border"];
		}
		if (init.hasOwnProperty("opacity")) {
			this._alpha = init["opacity"];
		}
		if (init.hasOwnProperty("alpha")) {
			this._alphaMotion = init["alpha"];
		}
		if (init.hasOwnProperty("font")) {
			this._font = init["font"];
		}
		if (init.hasOwnProperty("x")) {
			this._x = init["x"];
		}
		if (init.hasOwnProperty("y")) {
			this._y = init["y"];
		}
		if (init.hasOwnProperty("shadow")) {
			this._shadow = init["shadow"];
		}
		if (init.hasOwnProperty("position")) {
			if (init["position"] === "relative") {
				this.absolute = false;
				if (this.mode < 7) {
					console.warn("Using relative position for CSA comment.");
				}
			}
		}
	}