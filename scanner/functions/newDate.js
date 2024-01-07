function newDate(days) {
  return DateTime.now().plus({days}).toJSDate();
}