function WalkontableSelection(instance, settings) {
  this.instance = instance;
  this.settings = settings;
  this.selected = [];
  if (settings.border) {
    this.border = new WalkontableBorder(instance, settings);
  }
}