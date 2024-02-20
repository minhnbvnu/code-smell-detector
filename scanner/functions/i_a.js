function i_a(t, e, r, n) {  // 73  75  78  80
    return this.remainder = null,
        this._a00 = 65535 & t,
        this._a16 = t >>> 16,
        this._a32 = 0,
        this._a48 = 0,
        this.clone = function() {  // 77  81
            return new i_i(this._a00,this._a16,this._a32,this._a48)
        },
        this
}