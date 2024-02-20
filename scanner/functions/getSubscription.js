function getSubscription(subscriber = () => {}) {
    return new Observable(subscriber).subscribe();
  }