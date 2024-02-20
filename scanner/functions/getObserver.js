function getObserver(inner) {
    let observer;
    new Observable(x => { observer = x }).subscribe(inner);
    return observer;
  }