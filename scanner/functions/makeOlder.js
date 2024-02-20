function makeOlder(years, newname) {
  this.age += years;
  if (newname) {
    this.name = newname;
  }
}