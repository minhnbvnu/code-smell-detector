function HPoint(
	    x,
	    y,
	    lastPointOfContour,
	    onCurve
	) {
	    this.x = this.xo = Math.round(x * 64) / 64; // hinted x value and original x-value
	    this.y = this.yo = Math.round(y * 64) / 64; // hinted y value and original y-value

	    this.lastPointOfContour = lastPointOfContour;
	    this.onCurve = onCurve;
	    this.prevPointOnContour = undefined;
	    this.nextPointOnContour = undefined;
	    this.xTouched = false;
	    this.yTouched = false;

	    Object.preventExtensions(this);
	}