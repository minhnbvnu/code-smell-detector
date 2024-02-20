function currentMonth(date) {
      return date.isSame(new Date(), 'month') ? ' vis-current-month' : '';
    }