function week_day_flag_setter(flag_name) {
  return function(v){ this.setDataValue(flag_name,  v ? works_whole_day() : works_none()) };
}