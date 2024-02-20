function toJalaali(gy, gm, gd) {
  try {
    var j = jalaali.toJalaali(gy, gm + 1, gd)
    j.jm -= 1
    return j
  } catch (e) {
    return {
      jy: NaN
      , jm: NaN
      , jd: NaN
    }
  }
}