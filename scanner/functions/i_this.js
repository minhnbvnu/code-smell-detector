function i_this(t) {  // 72
    var s = {'remainder': null, '_a00': 51847, '_a16': 34283, '_a32': 31153, '_a48': 40503, 'clone': function() { return new i_i(this._a00,this._a16,this._a32,this._a48)}}
    var u = {'remainder': null, '_a00': 60239, '_a16': 10196, '_a32': 44605, '_a48': 49842}
    return this.seed = new i_a(t),
        this.v1 = add(add(this.seed.clone(), s), u),
        this.v2 = add(this.seed.clone(), u),
        this.v3 = this.seed.clone(),
        this.v4 = subtract(this.seed.clone(), s),
        this.total_len = 0,
        this.memsize = 0,
        this.memory = null,
        this
}