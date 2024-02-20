function d3_time_format_utc() {
  this._ = new Date(Date.UTC.apply(this, arguments));
}