function spilloverSubscribe(subscriber) {
  const spillover = this.spillover;
  const index = spillover.indexOf(subscriber);

  if (index === -1) {
    spillover.push(subscriber);
  }
}