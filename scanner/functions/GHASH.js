function GHASH (key) {
  this.h = key
  this.state = Buffer.alloc(16, 0)
  this.cache = Buffer.allocUnsafe(0)
}