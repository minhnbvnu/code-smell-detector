function addDescription(text, ajust) {

  const yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + ajust

  const descriptionLabel = utils.createLabel(text, 0, yAxis, 400, 20, true);

  this.view.addSubview(descriptionLabel);
}