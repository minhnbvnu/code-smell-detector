function getGradient(fill, opacity) {
	// Note: XD API docs say this should be called `LinearGradientFill`
	return fill instanceof xd.LinearGradient ? _getLinearGradient(fill, opacity) :
		   fill instanceof xd.RadialGradient ? _getRadialGradient(fill, opacity) :
			fill instanceof xd.AngularGradient ? _getSweepGradient(fill, opacity) :
		   '';
}