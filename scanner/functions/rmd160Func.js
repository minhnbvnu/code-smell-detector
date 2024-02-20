function rmd160Func (data) {
    return new RIPEMD160().update(data).digest()
  }