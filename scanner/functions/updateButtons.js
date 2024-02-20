function updateButtons()
{
  var className = isPlaying ? "disabled" : "active";
  playButton.attr("class", className); 
}