function weekGetter(size) {
   return function(date) {
      var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
         thisThurs = getThursdayThisWeek(date);

      var diff = +thisThurs - +firstThurs,
         result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week

      return padNumber(result, size);
   };
}