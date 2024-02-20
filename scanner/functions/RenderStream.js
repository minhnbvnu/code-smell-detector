function RenderStream (render) {
    var this$1 = this;

    superclass.call(this);
    this.buffer = '';
    this.render = render;
    this.expectedSize = 0;

    this.write = createWriteFunction(function (text, next) {
      var n = this$1.expectedSize;
      this$1.buffer += text;
      if (this$1.buffer.length >= n) {
        this$1.next = next;
        this$1.pushBySize(n);
        return true // we will decide when to call next
      }
      return false
    }, function (err) {
      this$1.emit('error', err);
    });

    this.end = function () {
      // the rendering is finished; we should push out the last of the buffer.
      this$1.done = true;
      this$1.push(this$1.buffer);
    };
  }