function Hook(title, fn) {
  Runnable.call(this, title, fn);
  this.type = 'hook';
}