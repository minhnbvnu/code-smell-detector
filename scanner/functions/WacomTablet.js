function WacomTablet() {
	this.penValues = {
		// wacom
		isWacom: null,
		isEraser: null,
		pressure: null,
		sysX: null,
		sysY: null,
		tabX: null,
		tabY: null,
		rotationDeg: null,
		rotationRad: null,
		tiltX: null,
		tiltY: null,
		tangPressure: null,
		version: null,
		pointerType: null,
		tabletModel: null,
		// calculated
		azimuth: null,
		altitude: null
	}
}