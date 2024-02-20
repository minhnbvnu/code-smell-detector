function toGregorian(jy, jm, jd) {
  try {
    var g = jalaali.toGregorian(jy, jm + 1, jd)
    g.gm -= 1
    return g
  } catch (e) {
    return {
      gy: NaN
      , gm: NaN
      , gd: NaN
    }
  }
}