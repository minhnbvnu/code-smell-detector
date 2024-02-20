function HitTest(t, hit, normal) {
  this.t = arguments.length ? t : Number.MAX_VALUE;
  this.hit = hit;
  this.normal = normal;
}