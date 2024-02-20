function datetimeFromISO (string) {
  const datetime = DateTime.fromISO(string).toUTC()

  return datetime.isValid ? datetime : null
}