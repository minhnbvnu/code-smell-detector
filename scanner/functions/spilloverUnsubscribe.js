function spilloverUnsubscribe(subscriber) {
  const spillover = this.spillover;
  const index = spillover.indexOf(subscriber);

  if (index !== -1) {
    spillover.splice(index, 1);
  }
}