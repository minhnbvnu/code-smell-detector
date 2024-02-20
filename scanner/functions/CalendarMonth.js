function CalendarMonth(day, args){
    var self = this;
    this.date           = moment.utc(day).startOf('month');
    this._leaves        = {};
    this._bank_holidays = {};


    if (args && args.today) {
      self.today = args.today;
    } else {
      throw new Error('CalendarMonth requires today - moment object that represents today');
    }

    if (args){
      self._schedule = args.schedule;
    }

    if ( ! self._schedule ) {
      throw new Error('CalendarMonth requires schedule');
    }

    if (args && args.bank_holidays){
        var map = {};
        args.bank_holidays.forEach(function(day){
            day = {
              date : moment.utc(day.date),
              name : day.name,
            };
            map[day.date.clone().format(self.default_date_format())] = day;
        });
        self._bank_holidays = map;
    }

    if (args && args.leave_days){
        var map = {};
        args.leave_days.forEach(function(day){
            var attribute = moment.utc(day.date).format(self.default_date_format());
            if ( ! map[attribute] ) {
                map[attribute] = day;
            } else if ( map[attribute] ) {

                if (map[attribute].is_all_day_leave()) {
                    return;
                }

                if (day.is_all_day_leave()){
                    map[attribute] = day;
                } else if ( map[attribute].day_part !== day.day_part ) {

                  // Merge leave types from both days into one in "map"
                  if (day.is_morning_leave()) {
                    map[attribute].morning_leave_type_id = day.morning_leave_type_id;
                  }

                  if ( day.is_afternoon_leave() ) {
                    map[attribute].afternoon_leave_type_id = day.afternoon_leave_type_id;
                  }

                  map[attribute].pretend_to_be_full_day();
                }
            }
        });
        self._leaves = map;
    }

    self._leave_types_map = {};

    if (args && args.leave_types) {
      // Build leave types look up dictionary
      args.leave_types.forEach(lt => self._leave_types_map[ lt.id ] = lt);
    }

  return;
}