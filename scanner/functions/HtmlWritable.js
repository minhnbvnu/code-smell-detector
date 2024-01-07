function HtmlWritable(options) {
  Writable.call(this, options);
  this.chunks = [];
  this.html = '';
}