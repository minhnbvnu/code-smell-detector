function newDateString(days) {
  return DateTime.now().plus({days}).toISO();
}