function TColor(rgb) {
  return Trait.compose(TEquality, Trait({
    get rgb() { return rgb; },
    equals: function(col) { return col.rgb.equals(this.rgb); }
  }));
}