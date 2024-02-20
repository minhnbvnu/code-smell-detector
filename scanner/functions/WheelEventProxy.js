function WheelEventProxy (scaleFactor, deltaMode) {

    /**
    * @property {number} _scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
    * @private
    */
    this._scaleFactor = scaleFactor;

    /**
    * @property {number} _deltaMode - The reported delta mode.
    * @private
    */
    this._deltaMode = deltaMode;

    /**
    * @property {any} originalEvent - The original event _currently_ being proxied; the getters will follow suit.
    * @private
    */
    this.originalEvent = null;

}