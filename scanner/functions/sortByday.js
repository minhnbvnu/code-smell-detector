function sortByday(aRules, aWeekStart) {
  var thisobj = {
    ruleDayOfWeek: ICAL.RecurIterator.prototype.ruleDayOfWeek,
    sort_byday_rules: ICAL.RecurIterator.prototype.sort_byday_rules
  };

  return thisobj.sort_byday_rules(aRules, aWeekStart || ICAL.Time.MONDAY);
}