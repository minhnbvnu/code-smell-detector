function Buffer2D() {
			this._maxsize = 0;
			this._upload = true;
			this._uploadSize = 0;
			Buffer2D.__super.call(this);
			this.lock = true;
		}