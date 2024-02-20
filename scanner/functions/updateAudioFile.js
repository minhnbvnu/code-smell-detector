function updateAudioFile() {

  d3.select("#row-audio").classed("error", false);

  audio.pause();
  video.kill();

  // Skip if empty
  if (!this.files || !this.files[0]) {
    d3.select("#minimap").classed("hidden", true);
    preview.file(null);
    setClass(null);
    return true;
  }

  d3.select("#loading-message").text("Analyzing...");

  setClass("loading");

  preview.loadAudio(this.files[0], function(err){

    if (err) {
      d3.select("#row-audio").classed("error", true);
      setClass("error", "Error decoding audio file");
    } else {
      setClass(null);
    }

    d3.selectAll("#minimap, #submit").classed("hidden", !!err);

  });

}