function hideAll() {
  boxes.forEach(function (box) {
    box.style.display = 'none';
  });
  sectionHeaders.forEach(function (header) {
    header.style.display = 'none';
  });
}