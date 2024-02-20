function resizeHandler() {
  let ias = this;
  let lastScroll = ias._lastScroll || defaultLastScroll;

  const scroll = ias._lastScroll = calculateScroll(ias.scrollContainer, lastScroll);

  this.emitter.emit(Events.RESIZED, {scroll});
}