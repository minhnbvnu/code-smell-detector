function dateFromArray(config) {
  var g
    , j
    , jy = config._a[0]
    , jm = config._a[1]
    , jd = config._a[2]

  if ((jy == null) && (jm == null) && (jd == null))
    return [0, 0, 1]
  jy = jy != null ? jy : 0
  jm = jm != null ? jm : 0
  jd = jd != null ? jd : 1
  if (jd < 1 || jd > jMoment.jDaysInMonth(jy, jm) || jm < 0 || jm > 11)
    config._isValid = false
  g = toGregorian(jy, jm, jd)
  j = toJalaali(g.gy, g.gm, g.gd)
  if (isNaN(g.gy))
    config._isValid = false
  config._jDiff = 0
  if (~~j.jy !== jy)
    config._jDiff += 1
  if (~~j.jm !== jm)
    config._jDiff += 1
  if (~~j.jd !== jd)
    config._jDiff += 1
  return [g.gy, g.gm, g.gd]
}