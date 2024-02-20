function currentYear(date) {
      return date.isSame(new Date(), 'year') ? ' vis-current-year' : '';
    }