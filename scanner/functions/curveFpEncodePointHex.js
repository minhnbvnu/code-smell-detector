function curveFpEncodePointHex(p) {
	if (p.isInfinity()) return "00";
	var xHex = p.getX().toBigInteger().toString(16);
	var yHex = p.getY().toBigInteger().toString(16);
	var oLen = this.getQ().toString(16).length;
	if ((oLen % 2) != 0) oLen++;
	while (xHex.length < oLen) {
		xHex = "0" + xHex;
	}
	while (yHex.length < oLen) {
		yHex = "0" + yHex;
	}
	return "04" + xHex + yHex;
}