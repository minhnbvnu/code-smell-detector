function currentWeek(date) {
      return date.isSame(new Date(), 'week') ? ' vis-current-week' : '';
    }