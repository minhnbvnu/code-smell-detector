function spilloverNotifySubscribers(args) {
  const spillover = this.spillover;
  const source = this.source;

  for (let i = 0, ii = spillover.length; i < ii; ++i) {
    spillover[i].handleChange(source, args);
  }
}