function notifySubscribers() {
  subscribers.forEach(sub => sub());
}