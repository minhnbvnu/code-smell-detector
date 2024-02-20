function Environment(file) {
  if (!(this instanceof Environment))
    return new Environment(file);

  this.path = file && path.resolve(file);
  try {
    this.raw = this.path && fs.readFileSync(this.path);
  } catch (e) {
    this.raw = '';
  }
  try {
    this.env = this.raw ? JSON.parse(this.raw) : Object.create(null);
  } catch (e) {
    this.env = Object.create(null);
  }
}