function ShortcutKey(properties) {
  this.ctrl = properties.ctrl || false;
  this.shift = properties.shift || false;
  this.alt = properties.alt || false;
  this.meta = properties.meta || false;
  this.key = properties.key || '';
}