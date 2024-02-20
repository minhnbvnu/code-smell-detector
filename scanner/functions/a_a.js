function a_a(t, e, r, n) {  // 79
    return void 0 === r ? (this._a00 = 65535 & t,
        this._a16 = t >>> 16,
        this._a32 = 65535 & e,
        this._a48 = e >>> 16,
        this) : (this._a00 = 0 | t,
        this._a16 = 0 | e,
        this._a32 = 0 | r,
        this._a48 = 0 | n,
        this)
}