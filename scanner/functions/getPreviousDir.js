function getPreviousDir() {
  var working_dir = $('#working_dir').val();
  return working_dir.substring(0, working_dir.lastIndexOf('/'));
}