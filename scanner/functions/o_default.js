function o_default() {  // 71  87  89  91
    return 2 == arguments.length ? digest(update(new o_default(arguments[1]), arguments[0])) : this instanceof o_default ? void i_this.call(this, arguments[0]) : new o(arguments[0])
}