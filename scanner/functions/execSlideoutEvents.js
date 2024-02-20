function execSlideoutEvents(url, response) {
    // exec qorSliderAfterShow after script loaded
    var qorSliderAfterShow = $.fn.qorSliderAfterShow;
    for (var name in qorSliderAfterShow) {
      if (
        qorSliderAfterShow.hasOwnProperty(name) &&
        !qorSliderAfterShow[name]["isLoaded"]
      ) {
        qorSliderAfterShow[name]["isLoaded"] = true;
        qorSliderAfterShow[name].call(this, url, response);
      }
    }
  }