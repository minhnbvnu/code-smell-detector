function SubSection(heading) {
  this.heading = heading.trim();
  this.id = this.heading.replace(/\s+/g, '-').toLowerCase();
  this.variables = [];
}