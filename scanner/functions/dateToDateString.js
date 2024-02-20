function dateToDateString(date) {
  let m = (date.getUTCMonth() + 1);
  if (m < 10) m = `0${m}`;
  let d = date.getUTCDate();
  if (d < 10) d = `0${d}`;
  return `${date.getUTCFullYear()}-${m}-${d}`;
}