function utcHours(time) {
    let seconds = timezone.utcOffset(
      new ICAL.Time(time)
    );

    // in hours
    return (seconds / 3600);
  }