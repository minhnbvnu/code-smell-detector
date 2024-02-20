function BasePoly(x, y, width, height, edges, color, borderWidth, borderColor, round) {
			//this.x=NaN;
			//this.y=NaN;
			//this.r=NaN;
			//this.width=NaN;
			//this.height=NaN;
			//this.edges=NaN;
			this.r0 = 0
			//this.color=0;
			//this.borderColor=NaN;
			//this.borderWidth=NaN;
			//this.round=0;
			this.fill = true;
			//this.mUint16Array=null;
			//this.mFloat32Array=null;
			this.r1 = Math.PI / 2;
			(round === void 0) && (round = 0);
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.edges = edges;
			this.color = color;
			this.borderWidth = borderWidth;
			this.borderColor = borderColor;
		}