function jalaaliToDateObject(
  jy,
  jm,
  jd,
  h,
  m,
  s,
  ms
) {
  var gregorianCalenderDate = toGregorian(jy, jm, jd);

  return new Date(
    gregorianCalenderDate.gy,
    gregorianCalenderDate.gm - 1,
    gregorianCalenderDate.gd,
    h || 0,
    m || 0,
    s || 0,
    ms || 0
  );
}