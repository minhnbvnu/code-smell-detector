function TeamView(args) {
  var me = this;

  this.user = args.user;
  this.base_date = args.base_date || this.user.company.get_today();

  // Optional parameters that override base date specify months range
  // Team view is going to represent.
  //
  // The precision is up to month, that is any smaller part of dates
  // (such as days, hours etc) are ignored.
  //
  // If those two parameters are missed - base_date is used to determine with month
  // Team view would represent.
  //
  this.start_date = args.start_date;
  this.end_date   = args.end_date;

  if (args.start_date && args.end_date && args.base_date) {
    Exception.throw_user_error({
      user_error   : 'Failed to calculate team view',
      system_error : 'TeamView could not be instanciated with start_date, end_data and base_date all defined.'
    });
  }
}