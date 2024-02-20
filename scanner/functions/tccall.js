function tccall(f,id) {
  TagCanvas.tc[id] && TagCanvas.tc[id][f]();
}