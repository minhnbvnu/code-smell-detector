function FontInContext(font) {
			//this._text=null;
			//this._words=null;
			this._index = 0;
			this._size = 14;
			this._italic = -2;
			FontInContext._cache2 = FontInContext._cache2 || [];
			this.setFont(font || "14px Arial");
		}