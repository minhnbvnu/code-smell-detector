function lchToLAB(lch) {
  let a = 0;
  let b = 0;

  if (lch.h !== 0) {
    a = Math.cos(degreesToRadians(lch.h)) * lch.c;
    b = Math.sin(degreesToRadians(lch.h)) * lch.c;
  }

  return new ColorLAB(lch.l, a, b);
}