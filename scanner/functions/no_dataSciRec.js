function no_dataSciRec (d) {
  if (d < 0.0001) {
    return Math.round(d * 10000) / 10000;
  } else {
    return d;
  }
}