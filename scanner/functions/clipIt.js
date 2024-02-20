function clipIt() {
  var clip_path = $(".show.block").text();

  console.log(clip_path);

  $clipboard.attr("style", clip_path);
}