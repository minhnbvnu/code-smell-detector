function zip(...sources) {
  return new Observable(observer => {
    if (sources.length === 0)
      return Observable.from([]);

    let queues = sources.map(() => []);

    function done() {
      return queues.some((q, i) => q.length === 0 && subscriptions[i].closed);
    }

    let subscriptions = sources.map((source, index) => Observable.from(source).subscribe({
      next(v) {
        queues[index].push(v);
        if (queues.every(q => q.length > 0)) {
          observer.next(queues.map(q => q.shift()));
          if (done())
            observer.complete();
        }
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        if (done())
          observer.complete();
      },
    }));

    return () => subscriptions.forEach(s => s.unsubscribe());
  });
}