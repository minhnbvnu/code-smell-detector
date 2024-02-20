function submitted() {

  d3.event.preventDefault();

  var theme = preview.theme(),
      caption = preview.caption(),
      selection = preview.selection(),
      file = preview.file();

  if (!file) {
    d3.select("#row-audio").classed("error", true);
    return setClass("error", "No audio file selected.");
  }

  if (theme.maxDuration && selection.duration > theme.maxDuration) {
    return setClass("error", "Your Audiogram must be under " + theme.maxDuration + " seconds.");
  }

  if (!theme || !theme.width || !theme.height) {
    return setClass("error", "No valid theme detected.");
  }

  video.kill();
  audio.pause();

  var formData = new FormData();

  formData.append("audio", file);
  if (selection.start || selection.end) {
    formData.append("start", selection.start);
    formData.append("end", selection.end);
  }
  formData.append("theme", JSON.stringify($.extend({}, theme, { backgroundImageFile: null })));
  formData.append("caption", caption);

  setClass("loading");
  d3.select("#loading-message").text("Uploading audio...");

	$.ajax({
		url: "/submit/",
		type: "POST",
		data: formData,
		contentType: false,
    dataType: "json",
		cache: false,
		processData: false,
		success: function(data){
      poll(data.id, 0);
		},
    error: error

  });

}