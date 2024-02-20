function TCircle(center, radius, rgb) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    Trait.resolve({ equals: 'equalColors' }, TColor(rgb)),
    Trait({
       center: center,
       radius: radius,
         area: function() { return Math.PI * this.radius * this.radius; },
       equals: function(c) { return c.center === this.center &&
                                    r.radius === this.radius },
      smaller: function(c) { return this.radius < c.radius }
  }));
}