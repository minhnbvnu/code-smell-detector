function bindInputs(id, layer) {
  const idxInput = document.getElementById('idx' + id);
  idxInput.onchange = function () {
    layer.setZIndex(parseInt(this.value, 10) || 0);
  };
  idxInput.value = String(layer.getZIndex());
}