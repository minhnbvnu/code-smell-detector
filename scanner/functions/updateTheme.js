function updateTheme() {
  preview.theme(d3.select(this.options[this.selectedIndex]).datum());
}