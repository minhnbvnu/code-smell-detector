function RTCError(code, message) {
  this.name = this.reasonName[Math.min(code, this.reasonName.length - 1)];
  this.message = typeof message === 'string' ? message : this.name;
}