function selectVideoFile(file) {
  videoSrc = URL.createObjectURL(file);
  reset();
}