function getDateTimeString() {
   var d = new Date();

   //
   // The additional ''s are used to force JavaScript to interpret the
   // '+' operator as string concatenation rather than arithmetic.
   //
   return d.getUTCFullYear() + '' +
      makeTwoDigits(d.getUTCMonth() + 1) + '' +
      makeTwoDigits(d.getUTCDate()) + 'T' + '' +
      makeTwoDigits(d.getUTCHours()) + '' +
      makeTwoDigits(d.getUTCMinutes()) + '' +
      makeTwoDigits(d.getUTCSeconds()) + 'Z';
}