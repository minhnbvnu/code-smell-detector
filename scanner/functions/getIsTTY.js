function getIsTTY () {
  return( (this._dest) ? this._dest.isTTY
        : (this._src) ? this._src.isTTY
        : false
        )
}