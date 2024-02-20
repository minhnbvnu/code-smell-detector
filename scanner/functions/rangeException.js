function rangeException(nth) {
    if (!nth || nth <= 0) {
      nth = 1;
    }

    let iter = subject.iterator();
    let last;

    while (nth--) {
      last = iter.next();
    }

    let newEvent = new ICAL.Event();

    newEvent.uid = subject.uid;

    newEvent.component
      .addPropertyWithValue(
        'recurrence-id',
        last
      ).setParameter(
        'range',
        ICAL.Event.THISANDFUTURE);

    return newEvent;
  }