function LeaveDay(args) {

  // Make sure all required data is provided
  _.each(
    ['date', 'day_part', 'sequelize', 'leave_type_id'],
    function(property){
      if (! _.has(args, property)) {
        throw new Error('No mandatory '+property+' was provided');
      }
    }
  );

  this.date          = args.date;
  this.day_part      = args.day_part;
  this.sequelize     = args.sequelize;
  this.morning_leave_type_id = this.afternoon_leave_type_id = args.leave_type_id;
}