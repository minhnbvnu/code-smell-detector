function toggleHelp () {
  var help = $("#help-modal");
  help.dialog("isOpen") ? help.dialog("close") : help.dialog("open");
}